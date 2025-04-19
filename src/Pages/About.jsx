import { useState } from 'react';
import { Instagram, Twitter, Mail, Linkedin, Github, Camera } from 'lucide-react';
import profile from '../assets/images/Manish image.jpg'

export default function About() {
  const [activeTab, setActiveTab] = useState('story');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4c4c4c] to-[#d8d8d8] "></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '24px 24px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative px-6 py-24 md:py-32 mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Learning, Coding, and Building the Future.
            </p>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                  fill="#F9FAFB">
            </path>
          </svg>
        </div>
      </div>

      {/* Profile Section */}
      <div className="container mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src={profile} alt="Profile" className="w-full h-full object-cover" />
            </div>
           
          </div>
          
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Manish Sonak</h2>
          <p className="mt-2 text-lg text-gray-600">I'm a MERN STACK Developer</p>
          
          <div className="flex mt-6 space-x-4">
            <SocialLink icon={<Twitter size={18} />} href="https://x.com/ManishSonak?t=2o5YiTZjag4Iso_813el-w&s=09" bgColor="bg-blue-500" />
            <SocialLink icon={<Instagram size={18} />} href="https://www.instagram.com/manish_sonak/" bgColor="bg-pink-600" />
            <SocialLink icon={<Linkedin size={18} />} href="https://www.linkedin.com/in/manish-sonak-26233129a/" bgColor="bg-blue-700" />
            <SocialLink icon={<Github size={18} />} href="https://github.com/manishsonak" bgColor="bg-gray-800" />
            <SocialLink icon={<Mail size={18} />} href="mailto:manishsonak9@gmail.com" bgColor="bg-red-500" />
          </div>
        </div>
      </div>

      {/* Content Tabs Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <TabButton 
              label="My Story" 
              active={activeTab === 'story'} 
              onClick={() => setActiveTab('story')} 
            />
            <TabButton 
              label="Skills & Expertise" 
              active={activeTab === 'skills'} 
              onClick={() => setActiveTab('skills')} 
            />
            <TabButton 
              label="Blog Focus" 
              active={activeTab === 'focus'} 
              onClick={() => setActiveTab('focus')} 
            />
            <TabButton 
              label="FAQ" 
              active={activeTab === 'faq'} 
              onClick={() => setActiveTab('faq')} 
            />
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'story' && <MyStory />}
          {activeTab === 'skills' && <SkillsExpertise />}
          {activeTab === 'focus' && <BlogFocus />}
          {activeTab === 'faq' && <FAQ />}
        </div>
      </div>

      {/* Thank You Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Thank You for Being Here</h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-8">
            Thank you for taking the time to visit and read my work. Your support means the world to me, 
            and I hope you find value, inspiration, and community here.
          </p>
          <div className="text-3xl font-medium text-indigo-600 mt-6">Manish Sonak</div>
        </div>
      </div>
    </div>
  );
}

// Tab Button Component
function TabButton({ label, active, onClick }) {
  return (
    <button
      className={`py-4 px-1 font-medium text-sm border-b-2 ${
        active 
          ? 'border-indigo-500 text-indigo-600' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// Social Link Component
function SocialLink({ icon, href, bgColor }) {
  return (
    <a 
      href={href} 
      className={`${bgColor} p-3 rounded-full text-white transition transform hover:-translate-y-1 hover:shadow-lg`}
    >
      {icon}
    </a>
  );
}

// Content Components
function MyStory() {
  return (
    <div className="md:grid md:grid-cols-2 md:gap-12 items-start">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">My Journey</h3>
        <p className="text-gray-600 mb-6">
          I started this blog as a way to share my passion for web development and design.
          What began as a simple creative outlet has grown into a community of like-minded
          individuals who share my curiosity about the digital world.
        </p>
        <p className="text-gray-600 mb-6">
          When I'm not writing here, you can find me hiking mountain trails, experimenting
          with new technologies, or diving into vintage bookstores looking for hidden literary treasures.
        </p>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">My Philosophy</h3>
        <blockquote className="bg-gray-100 border-l-4 border-indigo-500 italic p-6 my-6">
          "I believe that technology should be accessible to everyone and that good design
          can solve real human problems in meaningful ways."
        </blockquote>
        <p className="text-gray-600">
          I approach each article with thorough research, personal experience, and a genuine
          desire to provide value. My goal is to create content that not only informs but also
          inspires my readers to explore and create.
        </p>
      </div>
      
      <div className="mt-8 md:mt-0">
        <div className="bg-indigo-50 rounded-xl p-6 mb-6">
          <h4 className="text-xl font-semibold text-indigo-900 mb-4">Education</h4>
          <div className="mb-4">
            <div className="font-medium">Bachelor's in Computer Science</div>
            <div className="text-sm text-gray-600">University Name, 2015-2019</div>
          </div>
          <div>
            <div className="font-medium">Master's in Web Technologies</div>
            <div className="text-sm text-gray-600">University Name, 2019-2021</div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-xl p-6">
          <h4 className="text-xl font-semibold text-purple-900 mb-4">Experience</h4>
          <div className="mb-4">
            <div className="font-medium">Senior Frontend Developer</div>
            <div className="text-sm text-gray-600">Company Name, 2021-Present</div>
          </div>
          <div>
            <div className="font-medium">Web Designer</div>
            <div className="text-sm text-gray-600">Studio Name, 2019-2021</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillsExpertise() {
  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'HTML/CSS', level: 95 },
    { name: 'UI/UX Design', level: 80 },
    { name: 'Node.js', level: 70 },
    { name: 'TypeScript', level: 75 }
  ];
  
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Skills</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {skills.map((skill, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-900">{skill.name}</span>
                <span className="text-gray-600">{skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-indigo-600 rounded-full" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <h4 className="text-xl font-semibold text-gray-900 mb-4">Specialties</h4>
          <ul className="space-y-4">
            <SpecialtyItem title="Responsive Web Design">
              Creating websites that work flawlessly across all devices and screen sizes.
            </SpecialtyItem>
            <SpecialtyItem title="Interactive UI Components">
              Building reusable, accessible, and performant UI components.
            </SpecialtyItem>
            <SpecialtyItem title="Performance Optimization">
              Optimizing websites for maximum speed and efficiency.
            </SpecialtyItem>
            <SpecialtyItem title="Content Creation">
              Writing technical tutorials and articles that simplify complex concepts.
            </SpecialtyItem>
          </ul>
        </div>
      </div>
    </div>
  );
}

function SpecialtyItem({ title, children }) {
  return (
    <li className="flex">
      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center mt-1">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="ml-3">
        <h5 className="text-lg font-medium text-gray-900">{title}</h5>
        <p className="mt-1 text-gray-600">{children}</p>
      </div>
    </li>
  );
}

function BlogFocus() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">What You'll Find Here</h3>
      <p className="text-gray-600 mb-8">
        This blog is dedicated to providing thoughtful content about web development, 
        design, and the digital landscape that informs, inspires, and occasionally 
        challenges conventional thinking.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="w-12 h-12 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Tutorials & Guides</h4>
            <p className="text-gray-600">
              Step-by-step tutorials and comprehensive guides on modern web development 
              techniques, tools, and best practices.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="w-12 h-12 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Insights & Ideas</h4>
            <p className="text-gray-600">
              Thoughtful analysis on emerging technologies, design trends, and 
              the future of the web.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="w-12 h-12 rounded-md bg-green-100 text-green-600 flex items-center justify-center mb-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Resources & Tools</h4>
            <p className="text-gray-600">
              Curated collections of useful resources, tools, and libraries to enhance 
              your development workflow.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="w-12 h-12 rounded-md bg-yellow-100 text-yellow-600 flex items-center justify-center mb-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Case Studies</h4>
            <p className="text-gray-600">
              Real-world examples and detailed analyses of projects, including challenges 
              faced and solutions implemented.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
      
      <div className="space-y-6">
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">How often do you post new content?</h4>
          <p className="text-gray-600">
            I publish new articles every Monday and Thursday, with occasional special features 
            on weekends. You can subscribe to my newsletter to get notified about new posts.
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Do you accept guest posts?</h4>
          <p className="text-gray-600">
            Yes, I welcome guest contributions that align with my blog's focus and values. 
            Please check the Submissions page for guidelines and topic suggestions.
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Can I share your content?</h4>
          <p className="text-gray-600">
            Absolutely! I only ask that you provide proper attribution with a link back to 
            the original post. For commercial use, please contact me directly.
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Are you available for speaking or collaboration?</h4>
          <p className="text-gray-600">
            I'm always open to discussing potential partnerships, speaking engagements, 
            or collaborative projects. Please reach out via the contact form with your ideas.
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Do you offer consulting services?</h4>
          <p className="text-gray-600">
            Yes, I provide consulting services for web development, UI/UX design, and content 
            strategy. You can find more information on my Services page or contact me directly 
            to discuss your specific needs.
          </p>
        </div>
      </div>
    </div>
  );
}