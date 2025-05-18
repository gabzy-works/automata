import React from 'react';
import { Github, Mail, Linkedin, BookOpen } from 'lucide-react';

interface Member {
  name: string;
  role: string;
  email: string;
  github: string;
  linkedin: string;
  contributions: string[];
  expertise: string[];
  image: string;
}

const members: Member[] = [
  {
    name: "Gab Earnest Obregon",
    role: "Team Leader",
    email: "gab@dlsud.edu.ph",
    github: "gabzy-works",
    linkedin: "gab",
    contributions: [
      "Project architecture",
      "Automata theory implementation",
      "Team coordination"
    ],
    expertise: ["Automata Theory", "Formal Languages", "Algorithm Design"],
    image: "/images/gab1.jpg"
  },
  {
    name: "Armon Sta Ana",
    role: "Developer",
    email: "CCE1292@dlsud.edu.ph",
    github: "Amron",
    linkedin: "name",
    contributions: [
      "Frontend development",
      "UI/UX design",
      "Visualization components",
      
    ],
    expertise: ["React", "D3.js", "UI/UX Design","DFA Implementation"],
    image: "/images/Armon1.jpg"
  },
  {
    name: "Neil Anthony Delos Reyes",
    role: "Developer",
    email: "nname@example.com",
    github: "name",
    linkedin: "name",
    contributions: [
      "Backend logic",
      "Algorithm implementation",
      "Testing infrastructure"
    ],
    expertise: ["Backend Development", "Algorithms", "Testing"],
    image: "/images/Neil1.jpg"
  },
  {
    name: "Aaron Angeles",
    role: "Developer",
    email: "names@example.com",
    github: "name",
    linkedin: "name",
    contributions: [
      "State management",
      "Performance optimization",
      "Documentation"
    ],
    expertise: ["State Management", "Performance", "Documentation"],
    image: "/images/Aaron1.jpg"
  }
];

const Members: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-16">Our Team</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-indigo-200 font-medium inline-block bg-indigo-600/30 px-3 py-1 rounded-full backdrop-blur-sm">
                    {member.role}
                  </p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.expertise.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6">
                  <a 
                    href={`mailto:${member.email}`}
                    className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors group"
                  >
                    <Mail className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{member.email}</span>
                  </a>
                  
                  <a 
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors group"
                  >
                    <Github className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">@{member.github}</span>
                  </a>
                  
                  <a 
                    href={`https://linkedin.com/in/${member.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors group"
                  >
                    <Linkedin className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">LinkedIn Profile</span>
                  </a>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="flex items-center text-gray-800 font-medium mb-3">
                    <BookOpen className="h-4 w-4 mr-2 text-indigo-600" />
                    <span>Key Contributions</span>
                  </h3>
                  <ul className="space-y-2">
                    {member.contributions.map((contribution, idx) => (
                      <li 
                        key={idx}
                        className="text-sm text-gray-600 flex items-center before:content-['•'] before:mr-2 before:text-indigo-400"
                      >
                        {contribution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;