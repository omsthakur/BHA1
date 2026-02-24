"""
Texas BHA API Tests - Comprehensive backend testing
Tests all CRUD operations and critical edge cases
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://bha-portal-dev.preview.emergentagent.com')

class TestPublicAPIs:
    """Public API endpoint tests"""
    
    def test_api_health(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Texas BHA API"
        print("✓ API health check passed")

    def test_committees_endpoint(self):
        """Test committees endpoint"""
        response = requests.get(f"{BASE_URL}/api/committees")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Committees endpoint returned {len(data)} committees")

    def test_projects_endpoint(self):
        """Test projects endpoint"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Projects endpoint returned {len(data)} projects")

    def test_policies_endpoint(self):
        """Test policies endpoint"""
        response = requests.get(f"{BASE_URL}/api/policies")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Policies endpoint returned {len(data)} policies")

    def test_gallery_endpoint(self):
        """Test gallery endpoint"""
        response = requests.get(f"{BASE_URL}/api/gallery")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Gallery endpoint returned {len(data)} gallery items")

    def test_chapters_endpoint(self):
        """Test chapters endpoint"""
        response = requests.get(f"{BASE_URL}/api/chapters")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Chapters endpoint returned {len(data)} chapters")

    def test_opportunities_endpoint(self):
        """Test opportunities endpoint"""
        response = requests.get(f"{BASE_URL}/api/opportunities")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Opportunities endpoint returned {len(data)} opportunities")

    def test_announcements_endpoint(self):
        """Test announcements endpoint"""
        response = requests.get(f"{BASE_URL}/api/announcements")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Announcements endpoint returned {len(data)} announcements")

    def test_consulting_services_endpoint(self):
        """Test consulting services endpoint"""
        response = requests.get(f"{BASE_URL}/api/consulting-services")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Consulting services endpoint returned {len(data)} services")

    def test_newsletters_endpoint(self):
        """Test newsletters endpoint"""
        response = requests.get(f"{BASE_URL}/api/newsletters")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Newsletters endpoint returned {len(data)} newsletters")


class TestTeamAPI:
    """Team API tests - specific verification for team member categories"""
    
    def test_team_endpoint_returns_data(self):
        """Test team endpoint returns team members"""
        response = requests.get(f"{BASE_URL}/api/team")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Team should have members"
        print(f"✓ Team endpoint returned {len(data)} team members")
    
    def test_rachel_adams_category(self):
        """Verify Rachel Adams has correct category (Marketing Chair)"""
        response = requests.get(f"{BASE_URL}/api/team")
        assert response.status_code == 200
        data = response.json()
        
        rachel = next((m for m in data if m["name"] == "Rachel Adams"), None)
        assert rachel is not None, "Rachel Adams should exist in team"
        assert rachel["category"] == "Marketing Chair", f"Rachel Adams should be Marketing Chair, got: {rachel['category']}"
        print(f"✓ Rachel Adams verified: {rachel['role']} - {rachel['category']}")
    
    def test_michael_chang_category(self):
        """Verify Michael Chang has correct category (Expansion Chair)"""
        response = requests.get(f"{BASE_URL}/api/team")
        assert response.status_code == 200
        data = response.json()
        
        michael = next((m for m in data if m["name"] == "Michael Chang"), None)
        assert michael is not None, "Michael Chang should exist in team"
        assert michael["category"] == "Expansion Chair", f"Michael Chang should be Expansion Chair, got: {michael['category']}"
        print(f"✓ Michael Chang verified: {michael['role']} - {michael['category']}")
    
    def test_team_categories_structure(self):
        """Verify team has correct category structure"""
        response = requests.get(f"{BASE_URL}/api/team")
        assert response.status_code == 200
        data = response.json()
        
        categories = set(m["category"] for m in data)
        expected_categories = {"Executive Board", "Marketing Chair", "Expansion Chair", "Committee Leads"}
        
        # Verify expected categories exist
        for cat in expected_categories:
            members_in_cat = [m for m in data if m["category"] == cat]
            print(f"  - {cat}: {len(members_in_cat)} member(s)")
        
        print(f"✓ Team categories verified: {categories}")


class TestAdminAuth:
    """Admin authentication tests"""
    
    def test_admin_login_success(self):
        """Test admin login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": "admin@texasbha.org",
            "password": "TexasBHA2024!"
        })
        assert response.status_code == 200
        data = response.json()
        assert "token" in data
        assert data["email"] == "admin@texasbha.org"
        print("✓ Admin login successful")
        return data["token"]
    
    def test_admin_login_invalid_credentials(self):
        """Test admin login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": "admin@texasbha.org",
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        print("✓ Invalid credentials correctly rejected")
    
    def test_admin_verify_token(self):
        """Test admin token verification"""
        # First login to get token
        login_response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": "admin@texasbha.org",
            "password": "TexasBHA2024!"
        })
        token = login_response.json()["token"]
        
        # Verify token
        response = requests.get(f"{BASE_URL}/api/admin/verify", 
                               headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] == True
        print("✓ Admin token verification successful")


class TestContactForm:
    """Contact form submission tests"""
    
    def test_contact_submission(self):
        """Test contact form submission"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Contact User",
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "This is a test message",
            "inquiry_type": "General"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print("✓ Contact form submission successful")


class TestNewsletterSubscription:
    """Newsletter subscription tests"""
    
    def test_newsletter_subscribe(self):
        """Test newsletter subscription"""
        import uuid
        unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        
        response = requests.post(f"{BASE_URL}/api/newsletter/subscribe", json={
            "name": "TEST_Newsletter User",
            "email": unique_email
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print(f"✓ Newsletter subscription successful for {unique_email}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
