"""
Texas BHA Chapters & Map Feature Tests
Tests for chapter_type, lat/lng fields, and chapter CRUD operations
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://bha-portal-dev.preview.emergentagent.com')

class TestChaptersAPI:
    """Tests for /api/chapters endpoint - new map feature fields"""
    
    def test_chapters_returns_all_10_chapters(self):
        """Verify API returns all 10 seeded chapters"""
        response = requests.get(f"{BASE_URL}/api/chapters")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 10, f"Expected 10 chapters, got {len(data)}"
        print(f"✓ API returns all 10 chapters")
    
    def test_chapters_have_chapter_type_field(self):
        """Verify all chapters have chapter_type field (college/high_school)"""
        response = requests.get(f"{BASE_URL}/api/chapters")
        assert response.status_code == 200
        data = response.json()
        
        for chapter in data:
            assert "chapter_type" in chapter, f"Chapter {chapter['name']} missing chapter_type"
            assert chapter["chapter_type"] in ["college", "high_school"], \
                f"Invalid chapter_type: {chapter['chapter_type']}"
        print("✓ All chapters have valid chapter_type field")
    
    def test_chapters_have_lat_lng_fields(self):
        """Verify all chapters have lat and lng fields"""
        response = requests.get(f"{BASE_URL}/api/chapters")
        assert response.status_code == 200
        data = response.json()
        
        for chapter in data:
            assert "lat" in chapter, f"Chapter {chapter['name']} missing lat"
            assert "lng" in chapter, f"Chapter {chapter['name']} missing lng"
            assert isinstance(chapter["lat"], (int, float)), f"lat should be numeric for {chapter['name']}"
            assert isinstance(chapter["lng"], (int, float)), f"lng should be numeric for {chapter['name']}"
        print("✓ All chapters have lat/lng fields")
    
    def test_correct_number_of_college_chapters(self):
        """Verify there are 5 college chapters"""
        response = requests.get(f"{BASE_URL}/api/chapters")
        assert response.status_code == 200
        data = response.json()
        
        college_chapters = [c for c in data if c.get("chapter_type") == "college"]
        assert len(college_chapters) == 5, f"Expected 5 college chapters, got {len(college_chapters)}"
        
        college_names = [c["name"] for c in college_chapters]
        print(f"✓ 5 college chapters found: {college_names}")
    
    def test_correct_number_of_high_school_chapters(self):
        """Verify there are 5 high school chapters"""
        response = requests.get(f"{BASE_URL}/api/chapters")
        assert response.status_code == 200
        data = response.json()
        
        hs_chapters = [c for c in data if c.get("chapter_type") == "high_school"]
        assert len(hs_chapters) == 5, f"Expected 5 high school chapters, got {len(hs_chapters)}"
        
        hs_names = [c["name"] for c in hs_chapters]
        print(f"✓ 5 high school chapters found: {hs_names}")
    
    def test_ut_austin_coordinates(self):
        """Verify UT Austin has correct coordinates"""
        response = requests.get(f"{BASE_URL}/api/chapters")
        assert response.status_code == 200
        data = response.json()
        
        ut_austin = next((c for c in data if c["name"] == "UT Austin"), None)
        assert ut_austin is not None, "UT Austin chapter not found"
        
        # Approximate coordinates for UT Austin campus
        assert 30.0 < ut_austin["lat"] < 31.0, f"UT Austin lat out of range: {ut_austin['lat']}"
        assert -98.5 < ut_austin["lng"] < -97.0, f"UT Austin lng out of range: {ut_austin['lng']}"
        assert ut_austin["chapter_type"] == "college"
        print(f"✓ UT Austin verified: lat={ut_austin['lat']}, lng={ut_austin['lng']}, type=college")
    
    def test_prosper_hs_coordinates(self):
        """Verify Prosper High School has correct coordinates"""
        response = requests.get(f"{BASE_URL}/api/chapters")
        assert response.status_code == 200
        data = response.json()
        
        prosper = next((c for c in data if c["name"] == "Prosper High School"), None)
        assert prosper is not None, "Prosper High School chapter not found"
        
        # Approximate coordinates for Prosper, TX
        assert 33.0 < prosper["lat"] < 34.0, f"Prosper lat out of range: {prosper['lat']}"
        assert -97.5 < prosper["lng"] < -96.0, f"Prosper lng out of range: {prosper['lng']}"
        assert prosper["chapter_type"] == "high_school"
        print(f"✓ Prosper HS verified: lat={prosper['lat']}, lng={prosper['lng']}, type=high_school")


class TestAdminChaptersCRUD:
    """Tests for Admin CRUD operations on chapters with new fields"""
    
    @pytest.fixture
    def admin_token(self):
        """Get admin authentication token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": "admin@texasbha.org",
            "password": "TexasBHA2024!"
        })
        assert response.status_code == 200
        return response.json()["token"]
    
    def test_create_chapter_with_lat_lng_chapter_type(self, admin_token):
        """Test creating a new chapter with lat, lng, and chapter_type fields"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        
        new_chapter = {
            "name": "TEST_SMU Chapter",
            "university": "Southern Methodist University",
            "location": "Dallas, TX",
            "chapter_type": "college",
            "lat": 32.8429,
            "lng": -96.7834,
            "founding_date": "2024-12-01",
            "leadership": ["Test Leader"],
            "description": "Test chapter for API testing",
            "signup_link": "https://test.com"
        }
        
        # Create chapter
        response = requests.post(f"{BASE_URL}/api/admin/chapters", json=new_chapter, headers=headers)
        assert response.status_code == 200, f"Create failed: {response.text}"
        
        created = response.json()
        assert created["name"] == new_chapter["name"]
        assert created["chapter_type"] == "college"
        assert created["lat"] == 32.8429
        assert created["lng"] == -96.7834
        
        chapter_id = created["id"]
        print(f"✓ Created chapter with ID: {chapter_id}")
        
        # Verify persisted via GET
        get_response = requests.get(f"{BASE_URL}/api/chapters")
        chapters = get_response.json()
        test_chapter = next((c for c in chapters if c["id"] == chapter_id), None)
        assert test_chapter is not None, "Created chapter not found in GET"
        assert test_chapter["lat"] == 32.8429
        assert test_chapter["lng"] == -96.7834
        assert test_chapter["chapter_type"] == "college"
        print(f"✓ Verified chapter persisted with correct lat/lng/chapter_type")
        
        # Cleanup - delete test chapter
        delete_response = requests.delete(f"{BASE_URL}/api/admin/chapters/{chapter_id}", headers=headers)
        assert delete_response.status_code == 200
        print(f"✓ Cleanup: deleted test chapter")
    
    def test_update_chapter_lat_lng(self, admin_token):
        """Test updating a chapter's lat/lng fields"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        
        # First create a test chapter
        new_chapter = {
            "name": "TEST_Update Chapter",
            "university": "Test University",
            "location": "Test City, TX",
            "chapter_type": "high_school",
            "lat": 30.0,
            "lng": -95.0,
            "description": "Test chapter for update testing"
        }
        
        create_response = requests.post(f"{BASE_URL}/api/admin/chapters", json=new_chapter, headers=headers)
        assert create_response.status_code == 200
        chapter_id = create_response.json()["id"]
        
        # Update lat/lng
        update_data = {
            "lat": 31.5,
            "lng": -97.5,
            "chapter_type": "college"
        }
        
        update_response = requests.put(f"{BASE_URL}/api/admin/chapters/{chapter_id}", json=update_data, headers=headers)
        assert update_response.status_code == 200
        updated = update_response.json()
        
        assert updated["lat"] == 31.5, f"lat not updated: {updated['lat']}"
        assert updated["lng"] == -97.5, f"lng not updated: {updated['lng']}"
        assert updated["chapter_type"] == "college", f"chapter_type not updated: {updated['chapter_type']}"
        print(f"✓ Chapter lat/lng/chapter_type updated successfully")
        
        # Verify via GET
        get_response = requests.get(f"{BASE_URL}/api/chapters")
        chapters = get_response.json()
        test_chapter = next((c for c in chapters if c["id"] == chapter_id), None)
        assert test_chapter is not None
        assert test_chapter["lat"] == 31.5
        assert test_chapter["lng"] == -97.5
        print(f"✓ Verified update persisted in database")
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/admin/chapters/{chapter_id}", headers=headers)
        print(f"✓ Cleanup: deleted test chapter")


class TestChapterFieldsStructure:
    """Tests to verify chapter data structure matches requirements"""
    
    def test_chapter_required_fields(self):
        """Verify chapters have all required fields"""
        response = requests.get(f"{BASE_URL}/api/chapters")
        assert response.status_code == 200
        data = response.json()
        
        required_fields = ["id", "name", "location", "lat", "lng", "chapter_type"]
        optional_fields = ["university", "founding_date", "leadership", "description", "signup_link"]
        
        for chapter in data:
            for field in required_fields:
                assert field in chapter, f"Chapter {chapter.get('name', 'unknown')} missing {field}"
        
        print(f"✓ All chapters have required fields: {required_fields}")
    
    def test_lat_lng_are_in_texas(self):
        """Verify all coordinates are within Texas boundaries"""
        response = requests.get(f"{BASE_URL}/api/chapters")
        assert response.status_code == 200
        data = response.json()
        
        # Texas approximate boundaries
        TEXAS_LAT_MIN, TEXAS_LAT_MAX = 25.8, 36.5
        TEXAS_LNG_MIN, TEXAS_LNG_MAX = -106.6, -93.5
        
        for chapter in data:
            lat = chapter.get("lat", 0)
            lng = chapter.get("lng", 0)
            
            assert TEXAS_LAT_MIN < lat < TEXAS_LAT_MAX, \
                f"{chapter['name']} lat {lat} outside Texas"
            assert TEXAS_LNG_MIN < lng < TEXAS_LNG_MAX, \
                f"{chapter['name']} lng {lng} outside Texas"
        
        print(f"✓ All {len(data)} chapters have coordinates within Texas boundaries")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
