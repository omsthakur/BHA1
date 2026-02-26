// Static site data — all content hardcoded for deployment without a database

export const teamMembers = [
  { id: "1", name: "Orlando De Hoyos", role: "President", category: "Executive Board", bio: "Major: Public Health\nClass: Junior", photo_url: "" },
  { id: "2", name: "Aidan Cheng", role: "Vice President", category: "Executive Board", bio: "Major: Public Health\nClass: Sophomore", photo_url: "" },
  { id: "3", name: "Rishika Rochwani", role: "Director of Marketing", category: "Executive Board", bio: "Major: Public Health\nClass: Sophomore", photo_url: "" },
  { id: "4", name: "Daivik Menon", role: "Director of Expansion", category: "Executive Board", bio: "Major: Public Health\nClass: Sophomore", photo_url: "" },
  { id: "5", name: "John Rickert", role: "Director of Policy and Reform", category: "Executive Board", bio: "Major: Business\nClass: Sophomore", photo_url: "" },
  { id: "6", name: "Sanjay Krishna", role: "Director of Consulting", category: "Executive Board", bio: "Major: Biology\nClass: Sophomore", photo_url: "" },
  { id: "7", name: "Sarayu Chitturi", role: "Director of Outreach", category: "Executive Board", bio: "Major: Psychology\nClass: Junior", photo_url: "" },
  { id: "8", name: "Stacy Varghese", role: "Director of Philanthropy", category: "Executive Board", bio: "Major: Accounting\nClass: Junior", photo_url: "" },
  { id: "9", name: "Madison Taylor", role: "Marketing Chair", category: "Marketing Chair", bio: "Junior, Marketing & Healthcare Administration. Leading social media strategy and brand development.", photo_url: "" },
  { id: "10", name: "Brandon Kim", role: "Marketing Chair", category: "Marketing Chair", bio: "Sophomore, Communications & Business. Managing content creation and event promotions.", photo_url: "" },
  { id: "11", name: "Rachel Adams", role: "Outreach Lead", category: "Marketing Chair", bio: "Manages branding, social media, and event promotion strategy.", photo_url: "" },
  { id: "12", name: "Michael Chang", role: "Expansion Lead", category: "Expansion Chair", bio: "Drives chapter growth at universities across the state.", photo_url: "" },
  { id: "13", name: "Jessica Nguyen", role: "Expansion Chair", category: "Expansion Chair", bio: "Senior, Healthcare Admin. Driving chapter growth across Texas universities and high schools.", photo_url: "" },
  { id: "14", name: "David Rodriguez", role: "Expansion Chair", category: "Expansion Chair", bio: "Junior, Pre-Med & Business. Coordinating new chapter onboarding and mentor programs.", photo_url: "" },
];

export const chapters = [
  { id: "1", name: "UT Austin", university: "University of Texas at Austin", location: "Austin, TX", founding_date: "2022-09-01", description: "The founding chapter of Texas BHA, leading initiatives in healthcare policy and consulting at UT Austin.", lat: 30.2849, lng: -97.7341, chapter_type: "college" },
  { id: "2", name: "Texas A&M", university: "Texas A&M University", location: "College Station, TX", founding_date: "2023-01-15", description: "Focused on rural health economics and community outreach in the Brazos Valley region.", lat: 30.6187, lng: -96.3365, chapter_type: "college" },
  { id: "3", name: "Rice University", university: "Rice University", location: "Houston, TX", founding_date: "2023-04-01", description: "Bridging the Texas Medical Center with business innovation and healthcare entrepreneurship.", lat: 29.7174, lng: -95.4018, chapter_type: "college" },
  { id: "4", name: "Baylor University", university: "Baylor University", location: "Waco, TX", founding_date: "2023-08-20", description: "Combining faith-based healthcare values with evidence-based business strategies.", lat: 31.5493, lng: -97.1467, chapter_type: "college" },
  { id: "5", name: "University of Houston", university: "University of Houston", location: "Houston, TX", founding_date: "2024-01-10", description: "Connecting diverse perspectives in one of the nation's most diverse healthcare markets.", lat: 29.7199, lng: -95.3422, chapter_type: "college" },
  { id: "6", name: "Prosper High School", university: "Prosper High School", location: "Prosper, TX", founding_date: "2024-03-01", description: "Introducing healthcare business to the next generation.", lat: 33.2362, lng: -96.8011, chapter_type: "high_school" },
  { id: "7", name: "Bridgeland High School", university: "Bridgeland High School", location: "Cypress, TX", founding_date: "2024-04-15", description: "Introducing healthcare business to the next generation.", lat: 29.9541, lng: -95.6743, chapter_type: "high_school" },
  { id: "8", name: "Wylie High School", university: "Wylie High School", location: "Wylie, TX", founding_date: "2024-05-01", description: "Introducing healthcare business to the next generation.", lat: 33.0151, lng: -96.5389, chapter_type: "high_school" },
  { id: "9", name: "Round Rock High School", university: "Round Rock High School", location: "Round Rock, TX", founding_date: "2024-06-01", description: "Introducing healthcare business to the next generation.", lat: 30.5083, lng: -97.6789, chapter_type: "high_school" },
  { id: "10", name: "Travis High School", university: "Travis High School", location: "Austin, TX", founding_date: "2024-07-01", description: "Introducing healthcare business to the next generation.", lat: 30.2302, lng: -97.7706, chapter_type: "high_school" },
];

export const committees = [
  { id: "1", name: "Healthcare Consulting", description: "Provides consulting services to healthcare organizations, bridging business strategy with clinical excellence.", mission: "To empower healthcare organizations with data-driven solutions.", leadership: ["Sarah Mitchell", "James Rodriguez"], photo_url: "" },
  { id: "2", name: "Policy & Advocacy", description: "Researches and advocates for evidence-based healthcare policies that impact Texas communities.", mission: "To shape healthcare policy through rigorous research and advocacy.", leadership: ["Dr. Emily Chen", "Marcus Williams"], photo_url: "https://images.pexels.com/photos/8761541/pexels-photo-8761541.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "3", name: "Health Economics", description: "Analyzes healthcare market dynamics, pricing strategies, and economic impacts on patient care.", mission: "To advance understanding of healthcare economics.", leadership: ["Priya Patel", "David Kim"], photo_url: "https://images.pexels.com/photos/7108284/pexels-photo-7108284.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "4", name: "Community Outreach", description: "Connects Texas BHA with local communities through health fairs, workshops, and volunteer programs.", mission: "To bring healthcare business knowledge to underserved communities.", leadership: ["Maria Gonzalez", "Tyler Johnson"], photo_url: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "5", name: "Professional Development", description: "Organizes workshops, mentorship programs, and networking events to develop future healthcare leaders.", mission: "To cultivate the next generation of healthcare business professionals.", leadership: ["Alex Thompson", "Nina Brooks"], photo_url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "6", name: "Technology & Innovation", description: "Explores emerging technologies in healthcare including AI, telehealth, and digital health platforms.", mission: "To drive innovation at the intersection of technology and healthcare.", leadership: ["Kevin Zhao", "Rachel Adams"], photo_url: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

export const announcements = [
  { id: "1", title: "Spring 2025 Membership Drive Now Open", content: "Join Texas BHA and access exclusive resources, networking events, and career opportunities.", active: true },
  { id: "2", title: "Annual Conference Registration Opens March 1", content: "Early bird pricing available for the 2025 Texas Healthcare Business Conference.", active: true },
  { id: "3", title: "New Chapter at SMU - Welcome Mustangs!", content: "We're excited to announce our newest chapter at Southern Methodist University.", active: true },
  { id: "4", title: "Healthcare Innovation Challenge - Applications Due April 15", content: "Submit your innovative healthcare solutions for a chance to win $10,000.", active: true },
  { id: "5", title: "Summer Internship Placements - Apply by March 30", content: "Exclusive consulting internship opportunities with our partner firms.", active: true },
];

export const projects = [
  { id: "1", title: "Texas Rural Health Access Study", description: "Comprehensive analysis of healthcare accessibility in rural Texas counties, identifying gaps and proposing solutions.", image_url: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600", status: "completed", outcome: "Identified 15 underserved counties and proposed a mobile clinic network.", tags: ["Research", "Rural Health"] },
  { id: "2", title: "Healthcare Startup Accelerator", description: "12-week program supporting early-stage healthcare startups with mentorship, funding connections, and business strategy.", image_url: "https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=600", status: "ongoing", outcome: "Currently mentoring 8 startups in cohort 3.", tags: ["Entrepreneurship", "Mentorship"] },
  { id: "3", title: "Mental Health Policy Brief", description: "Research-backed policy brief on mental health parity in Texas, submitted to state legislators.", image_url: "https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=600", status: "completed", outcome: "Brief cited in 3 legislative committee hearings.", tags: ["Policy", "Mental Health"] },
  { id: "4", title: "Telehealth Implementation Guide", description: "Step-by-step guide for small practices to implement telehealth solutions efficiently and cost-effectively.", image_url: "https://images.pexels.com/photos/4031710/pexels-photo-4031710.jpeg?auto=compress&cs=tinysrgb&w=600", status: "ongoing", outcome: "Guide in beta testing with 12 partner practices.", tags: ["Technology", "Telehealth"] },
  { id: "5", title: "Hospital Efficiency Optimization", description: "Data analytics project improving operational efficiency at partner hospitals through process optimization.", image_url: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600", status: "completed", outcome: "Achieved 18% reduction in patient wait times.", tags: ["Analytics", "Operations"] },
  { id: "6", title: "Community Health Worker Program", description: "Training and deploying community health workers in underserved neighborhoods across Houston and Dallas.", image_url: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600", status: "ongoing", outcome: "25 CHWs deployed, serving 3,000+ residents.", tags: ["Community", "Public Health"] },
];

export const galleryItems = [
  { id: "1", title: "Annual Healthcare Conference 2024", image_url: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600", category: "Conferences", date: "2024-10-15" },
  { id: "2", title: "Committee Leadership Meeting", image_url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600", category: "Meetings", date: "2024-09-20" },
  { id: "3", title: "Community Health Fair", image_url: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600", category: "Events", date: "2024-08-10" },
  { id: "4", title: "Networking Social Event", image_url: "https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=600", category: "Socials", date: "2024-07-22" },
  { id: "5", title: "Student Chapter Summit", image_url: "https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=600", category: "Conferences", date: "2024-06-15" },
  { id: "6", title: "Policy Research Workshop", image_url: "https://images.pexels.com/photos/8761541/pexels-photo-8761541.jpeg?auto=compress&cs=tinysrgb&w=600", category: "Meetings", date: "2024-05-18" },
  { id: "7", title: "Volunteer Day at Local Clinic", image_url: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600", category: "Events", date: "2024-04-12" },
  { id: "8", title: "Professional Development Mixer", image_url: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600", category: "Socials", date: "2024-03-08" },
];

export const policies = [
  { id: "1", title: "Healthcare Price Transparency", summary: "Analyzing the impact of federal price transparency rules on Texas hospitals and insurance markets. Our research examines compliance rates, consumer utilization, and effects on healthcare costs.", status: "Active Research", tags: ["Transparency", "Pricing"], category: "Market Policy" },
  { id: "2", title: "Mental Health Parity in Texas", summary: "Evaluating the enforcement of mental health parity laws across Texas health plans. Documenting gaps between federal mandates and state-level implementation.", status: "Policy Brief Published", tags: ["Mental Health", "Parity"], category: "Health Equity" },
  { id: "3", title: "Telehealth Regulation Reform", summary: "Proposing regulatory frameworks that balance patient safety with innovation in telehealth delivery. Examining licensure, reimbursement, and cross-state practice barriers.", status: "Active Research", tags: ["Telehealth", "Regulation"], category: "Digital Health" },
  { id: "4", title: "Health Insurance Market Competition", summary: "Studying market concentration in Texas health insurance and its effects on premiums, provider networks, and consumer choice.", status: "Data Collection", tags: ["Insurance", "Competition"], category: "Market Policy" },
  { id: "5", title: "Rural Healthcare Access", summary: "Comprehensive policy analysis of rural hospital closures in Texas and innovative models for sustaining rural healthcare infrastructure.", status: "Active Research", tags: ["Rural Health", "Access"], category: "Access & Equity" },
];

export const opportunities = [
  { id: "1", title: "Summer Healthcare Consulting Internship", description: "Gain hands-on experience in healthcare consulting with our partner firms. 10-week paid program for undergraduate and graduate students.", type: "internship", cta_text: "Apply Now", cta_link: "#" },
  { id: "2", title: "Annual Health Policy Conference Volunteer", description: "Join our team of volunteers for the largest student-run health policy conference in Texas. Great networking opportunity.", type: "volunteer", cta_text: "Sign Up", cta_link: "#" },
  { id: "3", title: "Community Health Fair Partnership", description: "Partner with us to organize health fairs in underserved communities. We provide training, resources, and coordination support.", type: "philanthropy", cta_text: "Get Involved", cta_link: "#" },
  { id: "4", title: "Corporate Sponsorship Program", description: "Support the next generation of healthcare leaders. Sponsorship packages include branding, recruitment access, and event participation.", type: "sponsorship", cta_text: "Learn More", cta_link: "#" },
  { id: "5", title: "Healthcare Innovation Challenge", description: "Annual competition for innovative healthcare solutions. $10,000 in prizes and mentorship from industry leaders.", type: "competition", cta_text: "Register", cta_link: "#" },
  { id: "6", title: "Mentorship Program", description: "Connect with experienced healthcare professionals for personalized career guidance. Available for all Texas BHA members.", type: "professional_development", cta_text: "Join Program", cta_link: "#" },
];

export const newsletters = [
  { id: "1", title: "Texas BHA Spring 2025 Newsletter", date: "2025-03-01", preview: "Highlights from our spring membership drive, upcoming conference details, and new chapter announcements.", link: "#" },
  { id: "2", title: "Healthcare Innovation Spotlight - Q4 2024", date: "2024-12-15", preview: "Year-end recap of our consulting projects, policy briefs, and the Healthcare Innovation Challenge winners.", link: "#" },
  { id: "3", title: "Chapter Expansion Update - Fall 2024", date: "2024-10-01", preview: "Three new chapters launched this fall! Read about our expansion to SMU, UNT, and Texas State.", link: "#" },
  { id: "4", title: "Summer Internship Recap 2024", date: "2024-08-15", preview: "Our interns share their experiences at top healthcare consulting firms and hospitals across Texas.", link: "#" },
];

export const consultingServices = [
  { id: "1", title: "Strategic Planning", description: "Comprehensive strategic planning services for healthcare organizations, including market analysis, competitive positioning, and growth strategies.", icon: "target" },
  { id: "2", title: "Operational Efficiency", description: "Process optimization and workflow analysis to reduce costs and improve patient outcomes in clinical and administrative settings.", icon: "settings" },
  { id: "3", title: "Financial Analysis", description: "Healthcare financial modeling, revenue cycle optimization, and cost-benefit analyses for capital investments and program launches.", icon: "bar-chart" },
  { id: "4", title: "Policy Advisory", description: "Expert guidance on healthcare regulatory compliance, policy impact assessment, and government relations strategy.", icon: "shield" },
  { id: "5", title: "Technology Assessment", description: "Evaluation and implementation planning for health IT systems, EHRs, telehealth platforms, and digital health tools.", icon: "cpu" },
  { id: "6", title: "Market Research", description: "Primary and secondary research on healthcare markets, consumer behavior, and industry trends to inform strategic decisions.", icon: "search" },
];
