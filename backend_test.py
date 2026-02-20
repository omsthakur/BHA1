import requests
import sys
from datetime import datetime
import json

class TexasBHAAPITester:
    def __init__(self, base_url="https://bha-collective.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED")
            if details:
                print(f"   Details: {details}")
        
        self.test_results.append({
            "test_name": name,
            "success": success,
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, auth_required=False):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        if auth_required and self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            details = f"Status: {response.status_code}"
            
            if success:
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        details += f", Items returned: {len(response_data)}"
                    elif isinstance(response_data, dict) and "message" in response_data:
                        details += f", Message: {response_data['message']}"
                except:
                    pass
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', 'Unknown error')}"
                except:
                    details += f", Response: {response.text[:100]}"

            self.log_test(name, success, details)
            return success, response.json() if success else {}

        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return False, {}

    def test_admin_login(self):
        """Test admin login and get token"""
        print(f"\n🔑 Testing Admin Authentication...")
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "admin/login",
            200,
            data={"email": "admin@texasbha.org", "password": "TexasBHA2024!"}
        )
        if success and 'token' in response:
            self.token = response['token']
            print(f"   Token obtained: {self.token[:20]}...")
            return True
        return False

    def test_public_endpoints(self):
        """Test all public API endpoints"""
        print(f"\n🌐 Testing Public API Endpoints...")
        
        endpoints = [
            ("Root API", "", 200),
            ("Committees", "committees", 200),
            ("Projects", "projects", 200),
            ("Policies", "policies", 200),
            ("Gallery", "gallery", 200),
            ("Chapters", "chapters", 200),
            ("Opportunities", "opportunities", 200),
            ("Announcements", "announcements", 200),
            ("Consulting Services", "consulting-services", 200),
            ("Newsletters", "newsletters", 200),
        ]
        
        for name, endpoint, expected_status in endpoints:
            self.run_test(f"GET {name}", "GET", endpoint, expected_status)

    def test_contact_form(self):
        """Test contact form submission"""
        print(f"\n📧 Testing Contact Form...")
        test_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "This is a test message from the automated test suite.",
            "inquiry_type": "General"
        }
        
        self.run_test(
            "Contact Form Submission",
            "POST",
            "contact",
            200,
            data=test_data
        )

    def test_admin_endpoints(self):
        """Test admin-only endpoints"""
        if not self.token:
            print("\n❌ Cannot test admin endpoints - no token available")
            return

        print(f"\n🔐 Testing Admin Protected Endpoints...")
        
        # Test token verification
        self.run_test(
            "Admin Token Verification",
            "GET",
            "admin/verify",
            200,
            auth_required=True
        )

        # Test admin contacts view
        self.run_test(
            "Admin Contacts View",
            "GET",
            "admin/contacts",
            200,
            auth_required=True
        )

    def test_admin_crud_committees(self):
        """Test admin CRUD operations for committees"""
        if not self.token:
            return

        print(f"\n📋 Testing Admin CRUD Operations...")
        
        # Create a test committee
        test_committee = {
            "name": f"Test Committee {datetime.now().strftime('%H%M%S')}",
            "description": "Test committee created by automated test suite",
            "mission": "Testing mission",
            "leadership": ["Test Leader 1", "Test Leader 2"],
            "photo_url": "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600",
            "order": 99
        }
        
        success, created_committee = self.run_test(
            "Create Test Committee",
            "POST",
            "admin/committees",
            200,
            data=test_committee,
            auth_required=True
        )
        
        if success and created_committee.get('id'):
            committee_id = created_committee['id']
            
            # Update the committee
            update_data = {
                "description": "Updated description by automated test"
            }
            self.run_test(
                "Update Test Committee",
                "PUT",
                f"admin/committees/{committee_id}",
                200,
                data=update_data,
                auth_required=True
            )
            
            # Delete the committee
            self.run_test(
                "Delete Test Committee",
                "DELETE",
                f"admin/committees/{committee_id}",
                200,
                auth_required=True
            )

    def generate_report(self):
        """Generate test report"""
        print(f"\n📊 Test Results Summary")
        print(f"=" * 50)
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%" if self.tests_run > 0 else "N/A")
        print(f"=" * 50)
        
        failed_tests = [test for test in self.test_results if not test['success']]
        if failed_tests:
            print(f"\n❌ Failed Tests:")
            for test in failed_tests:
                print(f"   • {test['test_name']}: {test['details']}")
        
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "success_rate": (self.tests_passed/self.tests_run*100) if self.tests_run > 0 else 0,
            "failed_tests": failed_tests
        }

def main():
    """Main testing function"""
    print("🚀 Starting Texas BHA API Testing Suite")
    print(f"Target URL: https://bha-collective.preview.emergentagent.com/api")
    
    tester = TexasBHAAPITester()
    
    # Run all tests
    tester.test_public_endpoints()
    tester.test_contact_form()
    
    # Admin tests
    if tester.test_admin_login():
        tester.test_admin_endpoints()
        tester.test_admin_crud_committees()
    else:
        print("❌ Admin login failed - skipping admin tests")
    
    # Generate final report
    report = tester.generate_report()
    
    # Return exit code based on success rate
    return 0 if report['success_rate'] >= 80 else 1

if __name__ == "__main__":
    sys.exit(main())