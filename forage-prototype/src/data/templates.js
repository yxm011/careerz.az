export const templates = [
  {
    id: 'template-1',
    companyId: 'company-1',
    title: 'Software Developer Simulation - Pasha Bank',
    description: 'Experience working as a software developer at Azerbaijan\'s leading digital bank. Build features for mobile banking, implement security protocols, and collaborate with fintech teams.',
    tags: ['Software Development', 'Fintech', 'Mobile Apps'],
    difficulty: 'Intermediate',
    duration: '3-4 hours',
    status: 'template',
    version: 1,
    stages: [
      {
        id: 'stage-1',
        title: 'Project Brief & Setup',
        blocks: [
          {
            id: 'block-1',
            type: 'richText',
            data: {
              content: `<h2>Welcome to Pasha Bank Software Development Simulation</h2>
              <p>In this simulation, you'll work on building a new feature for Pasha Bank's mobile banking application. You'll receive a project brief, access to resources, and will submit your work for review.</p>
              <h3>Your Mission</h3>
              <p>Develop a secure money transfer feature that allows users to send money to other Pasha Bank customers using their phone number.</p>
              <h3>What You'll Learn</h3>
              <ul>
                <li>Mobile app development best practices</li>
                <li>Banking API integration</li>
                <li>Security and encryption protocols</li>
                <li>User authentication flows</li>
              </ul>`
            }
          },
          {
            id: 'block-2',
            type: 'asset',
            data: {
              files: [
                { name: 'pasha-bank-api-docs.pdf', url: '#', size: '2.3 MB' },
                { name: 'mobile-app-mockups.fig', url: '#', size: '5.1 MB' },
                { name: 'security-guidelines.pdf', url: '#', size: '1.8 MB' }
              ]
            }
          }
        ]
      },
      {
        id: 'stage-2',
        title: 'Technical Planning',
        blocks: [
          {
            id: 'block-3',
            type: 'richText',
            data: {
              content: `<h2>Planning Your Approach</h2>
              <p>Before diving into code, it's important to plan your technical approach. Consider the component structure, data flow, and edge cases.</p>
              <h3>Questions to Consider</h3>
              <ul>
                <li>How will you structure your React components?</li>
                <li>What state management approach will you use?</li>
                <li>How will you handle loading and error states?</li>
              </ul>`
            }
          },
          {
            id: 'block-4',
            type: 'textInput',
            data: {
              label: 'Describe your technical approach',
              placeholder: 'Explain your component architecture, data flow, and key technical decisions...',
              required: true
            }
          }
        ]
      },
      {
        id: 'stage-3',
        title: 'Implementation',
        blocks: [
          {
            id: 'block-5',
            type: 'richText',
            data: {
              content: `<h2>Build Your Solution</h2>
              <p>Now it's time to implement your solution. Create the recommendation widget according to the specifications in the project brief.</p>
              <h3>Requirements</h3>
              <ul>
                <li>Display at least 4 product recommendations</li>
                <li>Include product images, names, and prices</li>
                <li>Add hover effects and click interactions</li>
                <li>Ensure responsive design</li>
              </ul>`
            }
          },
          {
            id: 'block-6',
            type: 'fileUpload',
            data: {
              label: 'Upload your code files (ZIP)',
              accept: '.zip',
              required: true
            }
          },
          {
            id: 'block-7',
            type: 'linkInput',
            data: {
              label: 'Link to your GitHub repository (optional)',
              placeholder: 'https://github.com/username/repo',
              required: false
            }
          }
        ]
      },
      {
        id: 'stage-4',
        title: 'Documentation & Reflection',
        blocks: [
          {
            id: 'block-8',
            type: 'richText',
            data: {
              content: `<h2>Document Your Work</h2>
              <p>Great engineers don't just write code—they document it well. Explain your implementation and reflect on your experience.</p>`
            }
          },
          {
            id: 'block-9',
            type: 'textInput',
            data: {
              label: 'What challenges did you face and how did you overcome them?',
              placeholder: 'Describe the main challenges and your problem-solving approach...',
              required: true
            }
          },
          {
            id: 'block-10',
            type: 'textInput',
            data: {
              label: 'What would you improve given more time?',
              placeholder: 'Discuss potential improvements and optimizations...',
              required: true
            }
          }
        ]
      }
    ]
  },
  {
    id: 'template-2',
    companyId: 'company-2',
    title: 'Financial Analyst Simulation - SOCAR',
    description: 'Work as a financial analyst at the State Oil Company of Azerbaijan Republic (SOCAR). Analyze energy market data, create financial models, and present strategic recommendations.',
    tags: ['Finance', 'Energy Sector', 'Data Analysis'],
    difficulty: 'Advanced',
    duration: '4-5 hours',
    status: 'template',
    version: 1,
    stages: [
      {
        id: 'stage-1',
        title: 'Project Brief',
        blocks: [
          {
            id: 'block-1',
            type: 'richText',
            data: {
              content: `<h2>Oil & Gas Market Analysis Project</h2>
              <p>SOCAR is evaluating investment opportunities in renewable energy. You've been assigned to analyze the market and provide strategic recommendations.</p>
              <h3>Your Objectives</h3>
              <ul>
                <li>Analyze Azerbaijan's energy market trends</li>
                <li>Evaluate renewable energy opportunities</li>
                <li>Create financial projections</li>
                <li>Present strategic recommendations</li>
              </ul>`
            }
          },
          {
            id: 'block-2',
            type: 'asset',
            data: {
              files: [
                { name: 'azerbaijan-energy-market-data.xlsx', url: '#', size: '3.2 MB' },
                { name: 'renewable-energy-research.pdf', url: '#', size: '4.5 MB' },
                { name: 'financial-model-template.xlsx', url: '#', size: '1.1 MB' }
              ]
            }
          }
        ]
      },
      {
        id: 'stage-2',
        title: 'Market Analysis',
        blocks: [
          {
            id: 'block-3',
            type: 'richText',
            data: {
              content: `<h2>Conduct Your Analysis</h2>
              <p>Using the provided market data, perform a comprehensive analysis of Azerbaijan's renewable energy potential.</p>`
            }
          },
          {
            id: 'block-4',
            type: 'fileUpload',
            data: {
              label: 'Upload your completed financial model',
              accept: '.xlsx,.xls',
              required: true
            }
          },
          {
            id: 'block-5',
            type: 'textInput',
            data: {
              label: 'What is your recommended investment amount? (in millions AZN)',
              placeholder: 'e.g., 150M - 200M AZN',
              required: true
            }
          }
        ]
      },
      {
        id: 'stage-3',
        title: 'Strategic Recommendation',
        blocks: [
          {
            id: 'block-6',
            type: 'richText',
            data: {
              content: `<h2>Present Your Recommendation</h2>
              <p>Create a presentation summarizing your analysis and strategic recommendation for SOCAR leadership.</p>`
            }
          },
          {
            id: 'block-7',
            type: 'fileUpload',
            data: {
              label: 'Upload your presentation (PDF or PPT)',
              accept: '.pdf,.ppt,.pptx',
              required: true
            }
          },
          {
            id: 'block-8',
            type: 'textInput',
            data: {
              label: 'Executive Summary: Should SOCAR invest in renewable energy?',
              placeholder: 'Provide your recommendation with key supporting points...',
              required: true
            }
          }
        ]
      }
    ]
  },
  {
    id: 'template-3',
    companyId: 'company-3',
    title: 'Digital Marketing Specialist - Azercell',
    description: 'Plan and execute a digital marketing campaign for Azerbaijan\'s leading mobile operator. Develop strategy, create content, and analyze performance metrics for the local market.',
    tags: ['Marketing', 'Telecom', 'Social Media'],
    difficulty: 'Beginner',
    duration: '2-3 hours',
    status: 'template',
    version: 1,
    stages: [
      {
        id: 'stage-1',
        title: 'Campaign Brief',
        blocks: [
          {
            id: 'block-1',
            type: 'richText',
            data: {
              content: `<h2>5G Network Launch Campaign</h2>
              <p>Azercell is launching 5G network in Baku and needs a comprehensive digital marketing campaign to reach young professionals and tech enthusiasts.</p>
              <h3>Campaign Goals</h3>
              <ul>
                <li>Generate 100K impressions in Baku metro area</li>
                <li>Achieve 7% engagement rate on social media</li>
                <li>Drive 5G plan subscriptions</li>
                <li>Position Azercell as innovation leader</li>
              </ul>`
            }
          },
          {
            id: 'block-2',
            type: 'asset',
            data: {
              files: [
                { name: 'azercell-brand-guidelines.pdf', url: '#', size: '8.2 MB' },
                { name: '5g-campaign-assets.zip', url: '#', size: '45.3 MB' },
                { name: 'azerbaijan-market-research.pdf', url: '#', size: '2.1 MB' }
              ]
            }
          }
        ]
      },
      {
        id: 'stage-2',
        title: 'Strategy Development',
        blocks: [
          {
            id: 'block-3',
            type: 'richText',
            data: {
              content: `<h2>Develop Your Campaign Strategy</h2>
              <p>Outline your approach for reaching young professionals in Azerbaijan across digital channels. Consider local platforms and cultural preferences.</p>`
            }
          },
          {
            id: 'block-4',
            type: 'textInput',
            data: {
              label: 'Which platforms will you focus on and why? (Instagram, Facebook, TikTok, local platforms)',
              placeholder: 'Describe your platform selection strategy for Azerbaijan market...',
              required: true
            }
          },
          {
            id: 'block-5',
            type: 'textInput',
            data: {
              label: 'What key messages and themes will you emphasize for Azerbaijani audience?',
              placeholder: 'Outline your messaging strategy considering local culture and preferences...',
              required: true
            }
          }
        ]
      },
      {
        id: 'stage-3',
        title: 'Content Creation',
        blocks: [
          {
            id: 'block-6',
            type: 'richText',
            data: {
              content: `<h2>Create Campaign Content</h2>
              <p>Develop sample social media posts in Azerbaijani/Russian, ad copy, and visual concepts for your 5G launch campaign.</p>`
            }
          },
          {
            id: 'block-7',
            type: 'fileUpload',
            data: {
              label: 'Upload your content mockups and copy (Azerbaijani/Russian)',
              accept: '.pdf,.zip',
              required: true
            }
          },
          {
            id: 'block-8',
            type: 'linkInput',
            data: {
              label: 'Link to your campaign mood board (optional)',
              placeholder: 'https://...',
              required: false
            }
          }
        ]
      }
    ]
  },
  {
    id: 'template-4',
    companyId: 'company-4',
    title: 'Data Analyst Simulation - Kontakt Home',
    description: 'Analyze e-commerce data from Azerbaijan\'s leading electronics retailer. Build insights dashboards, identify trends, and make data-driven recommendations.',
    tags: ['Data Analysis', 'E-commerce', 'Business Intelligence'],
    difficulty: 'Advanced',
    duration: '5-6 hours',
    status: 'template',
    version: 1,
    stages: [
      {
        id: 'stage-1',
        title: 'Problem Definition',
        blocks: [
          {
            id: 'block-1',
            type: 'richText',
            data: {
              content: `<h2>Customer Behavior Analysis</h2>
              <p>Kontakt Home wants to understand customer purchasing patterns across Baku stores and online platform. Analyze data to identify trends and recommend strategies to increase sales.</p>
              <h3>Deliverables</h3>
              <ul>
                <li>Exploratory data analysis of Azerbaijan market</li>
                <li>Customer segmentation analysis</li>
                <li>Sales trend identification</li>
                <li>Business recommendations for Baku market</li>
              </ul>`
            }
          },
          {
            id: 'block-2',
            type: 'asset',
            data: {
              files: [
                { name: 'kontakt-sales-data.csv', url: '#', size: '12.5 MB' },
                { name: 'baku-stores-data.xlsx', url: '#', size: '3.8 MB' },
                { name: 'analysis-starter-template.xlsx', url: '#', size: '0.5 MB' }
              ]
            }
          }
        ]
      },
      {
        id: 'stage-2',
        title: 'Data Analysis',
        blocks: [
          {
            id: 'block-3',
            type: 'richText',
            data: {
              content: `<h2>Analyze Customer Data</h2>
              <p>Perform exploratory data analysis, identify customer segments, and analyze purchasing patterns across Baku locations.</p>`
            }
          },
          {
            id: 'block-4',
            type: 'fileUpload',
            data: {
              label: 'Upload your analysis file (Excel or Jupyter notebook)',
              accept: '.xlsx,.ipynb',
              required: true
            }
          },
          {
            id: 'block-5',
            type: 'textInput',
            data: {
              label: 'What are the key customer segments you identified in Azerbaijan market?',
              placeholder: 'Describe customer segments and their characteristics...',
              required: true
            }
          }
        ]
      },
      {
        id: 'stage-3',
        title: 'Business Recommendations',
        blocks: [
          {
            id: 'block-6',
            type: 'richText',
            data: {
              content: `<h2>Translate Insights to Action</h2>
              <p>What do your findings mean for Kontakt Home? Provide actionable recommendations for the Azerbaijan market.</p>`
            }
          },
          {
            id: 'block-7',
            type: 'textInput',
            data: {
              label: 'What are the top 3 trends you identified in customer behavior?',
              placeholder: 'List and explain the key trends specific to Baku/Azerbaijan market...',
              required: true
            }
          },
          {
            id: 'block-8',
            type: 'textInput',
            data: {
              label: 'What strategies do you recommend to increase sales?',
              placeholder: 'Provide specific, data-driven recommendations for Azerbaijan market...',
              required: true
            }
          }
        ]
      }
    ]
  }
];

export const companies = [
  { id: 'company-1', name: 'Pasha Bank', industry: 'Banking & Fintech' },
  { id: 'company-2', name: 'SOCAR', industry: 'Oil & Gas' },
  { id: 'company-3', name: 'Azercell', industry: 'Telecommunications' },
  { id: 'company-4', name: 'Kontakt Home', industry: 'Retail & E-commerce' }
];
