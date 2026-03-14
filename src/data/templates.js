// Keep only 1 simulation per difficulty level:
// - Beginner: ABB Bank (Digital Banking Analyst)
// - Intermediate: Siemens Mobility (Commercial Project Manager)
// - Advanced: SOCAR (Financial Analyst)

export const templates = [
  {
    id: 'template-abb',
    companyId: 'company-6',
    title: 'Digital Banking Analyst - ABB Bank',
    description: 'Join ABB Bank\'s digital transformation team. Analyze customer data, improve digital banking features, and help shape the future of banking in Azerbaijan.',
    tags: ['Banking', 'Data Analysis', 'Digital Transformation'],
    difficulty: 'Beginner',
    duration: '30-45 mins',
    status: 'published',
    version: 1,
    stages: [
      {
        id: 'intro-stage-1',
        title: 'Intro & Scenario',
        blocks: [
          {
            id: 'team-overview',
            type: 'teamOverview',
            data: {
              companyName: 'ABB Bank',
              projectTitle: 'The Digital Banking Team',
              description: 'Driving digital innovation and customer experience excellence at Azerbaijan\'s leading bank.',
              userRole: {
                name: 'You',
                title: 'Digital Banking Analyst',
                avatar: '👤',
                color: '#3b82f6',
                description: 'You are responsible for analyzing customer behavior on our digital platforms and identifying opportunities to improve the mobile and web banking experience. You\'ll work with data to understand user needs, spot trends, and make recommendations that directly impact how thousands of customers bank every day.'
              },
              teamMembers: [
                {
                  name: 'Leyla',
                  title: 'Product Manager',
                  avatar: '👩‍💼',
                  color: '#8b5cf6',
                  badge: 'PRODUCT LEAD',
                  description: 'Leyla oversees the digital banking product roadmap. She relies on your analysis to prioritize features and improvements that will have the biggest impact on customer satisfaction and engagement.'
                },
                {
                  name: 'Rashad',
                  title: 'UX Designer',
                  avatar: '👨‍💻',
                  color: '#10b981',
                  badge: 'DESIGN PARTNER',
                  description: 'Rashad designs the user interfaces for our mobile app and web platform. He needs your insights about user behavior to create intuitive, user-friendly experiences that customers love.'
                },
                {
                  name: 'Nigar',
                  title: 'Marketing Manager',
                  avatar: '👩‍💼',
                  color: '#f59e0b',
                  badge: 'CUSTOMER INSIGHTS',
                  description: 'Nigar develops campaigns to promote digital banking adoption. Your analysis helps her understand which features resonate with customers and how to communicate their value effectively.'
                }
              ]
            }
          },
          {
            id: 'scenario-brief',
            type: 'scenarioBrief',
            data: {
              title: 'Scenario brief',
              introduction: '<p>You\'ve just joined ABB Bank\'s Digital Banking Team as a <strong>Digital Banking Analyst</strong>. The bank has been investing heavily in its mobile app and online banking platform, and leadership wants to understand how customers are using these digital channels. Your role is to analyze user data, identify patterns, and provide actionable recommendations to improve the digital banking experience.</p><p>ABB Bank currently has <strong>500,000+ active digital banking users</strong> across Azerbaijan, with the majority in Baku. The mobile app was recently updated with new features, and the team needs to understand their impact.</p>',
              dialogues: [
                {
                  name: 'Leyla',
                  role: 'Product Manager',
                  avatar: '👩‍💼',
                  color: '#8b5cf6',
                  message: '"Welcome to the team! We just launched a new bill payment feature in the app last month. I need you to dig into the data and tell me how it\'s performing. Are customers using it? Where are they getting stuck?"'
                },
                {
                  name: 'Rashad',
                  role: 'UX Designer',
                  avatar: '👨‍💻',
                  color: '#10b981',
                  message: '"I\'ve been hearing mixed feedback about the app\'s navigation. Can you look at the user flow data and help me understand where people are having trouble? Your insights will guide our next design iteration."'
                },
                {
                  name: 'Nigar',
                  role: 'Marketing Manager',
                  avatar: '👩‍💼',
                  color: '#f59e0b',
                  message: '"We\'re planning a campaign to increase mobile app adoption among our older customers. I need to know what features they actually use versus what we think they need. Can you segment the data by age group?"'
                }
              ],
              conclusion: 'Your first week will focus on analyzing the recent app update and understanding customer behavior patterns. The team is counting on your insights to make data-driven decisions that will improve the digital banking experience for all ABB customers.'
            }
          }
        ]
      },
      {
        id: 'intro-stage-2',
        title: 'Welcome',
        blocks: [
          {
            id: 'role-overview',
            type: 'roleOverview',
            data: {
              title: 'Welcome to the Digital Banking Analyst Job Simulation',
              description: 'As a Digital Banking Analyst at ABB Bank, you\'ll bridge the gap between raw data and actionable business insights. You\'ll analyze how customers interact with digital banking platforms, identify opportunities for improvement, and help shape the future of banking in Azerbaijan.',
              yourRole: [
                'Analyze <strong>customer behavior</strong> on mobile and web banking platforms.',
                'Identify <strong>usage patterns and trends</strong> across different customer segments.',
                'Evaluate the <strong>performance of new features</strong> and updates.',
                'Collaborate with product, design, and marketing teams to <strong>improve user experience</strong>.',
                'Present <strong>data-driven recommendations</strong> to stakeholders.'
              ],
              yourGoal: [
                'Master <strong>digital banking metrics</strong> (DAU, MAU, conversion rates, feature adoption).',
                'Learn to <strong>segment customers</strong> and analyze behavior patterns.',
                'Identify <strong>friction points</strong> in the user journey.',
                'Develop skills in <strong>data visualization and storytelling</strong>.',
                'Make <strong>actionable recommendations</strong> based on data analysis.'
              ]
            }
          },
          {
            id: 'transition',
            type: 'transition',
            data: {
              title: 'Let\'s get started!',
              subtitle: 'Now that you understand your role, let\'s dive into your first analysis task!',
              illustration: '🚀'
            }
          }
        ]
      },
      {
        id: 'task-1',
        title: 'Task One',
        steps: [
          {
            blocks: [
              {
                id: 'task-1-intro',
                type: 'richText',
                data: {
                  content: `<h2>Understanding Conversion Rates</h2>
                  <p>The new bill payment feature was launched 30 days ago. Leyla needs to know if it's meeting expectations. Before we dive into the data, let's understand what conversion rates are and why they matter.</p>
                  <h3>What is a Conversion Rate?</h3>
                  <p><strong>Conversion Rate</strong> is the percentage of users who complete a desired action out of the total number of users who had the opportunity to complete it.</p>
                  <p><strong>Formula:</strong> (Users who completed action ÷ Total users) × 100</p>
                  <p>For example, if 100 people visit a page and 25 make a purchase, the conversion rate is 25%.</p>`
                }
              }
            ]
          },
          {
            blocks: [
              {
                id: 'team-insight-1',
                type: 'scenarioBrief',
                data: {
                  title: 'Team Insight',
                  dialogues: [
                    {
                      name: 'Leyla',
                      role: 'Product Manager',
                      avatar: '👩‍💼',
                      color: '#8b5cf6',
                      message: '"The bill payment feature is critical for our digital strategy. We need to understand if customers are actually using it and where they might be getting stuck. Your analysis will help us decide whether to invest more in this feature or pivot our approach."'
                    }
                  ]
                }
              }
            ]
          },
          {
            blocks: [
              {
                id: 'data-presentation',
                type: 'richText',
                data: {
                  content: `<h2>The Bill Payment Feature Data</h2>
                  <p>Here's what we know about the bill payment feature performance over the last 30 days:</p>
                  <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
                    <tr style="background: #f3f4f6; font-weight: 600;">
                      <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Metric</td>
                      <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Value</td>
                      <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Percentage</td>
                    </tr>
                    <tr>
                      <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Total app users</td>
                      <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">500,000</td>
                      <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">100%</td>
                    </tr>
                    <tr style="background: #f9fafb;">
                      <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Users who viewed bill payment page</td>
                      <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">125,000</td>
                      <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">25%</td>
                    </tr>
                    <tr>
                      <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Users who started a payment</td>
                      <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">37,500</td>
                      <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">30% of viewers</td>
                    </tr>
                    <tr style="background: #f9fafb;">
                      <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Users who completed a payment</td>
                      <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">30,000</td>
                      <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">80% of starters</td>
                    </tr>
                  </table>
                  <p><strong>Additional insights:</strong></p>
                  <ul>
                    <li>Average time on bill payment page: 3 minutes 45 seconds</li>
                    <li>Most common drop-off point: Payment confirmation screen (5,000 users)</li>
                  </ul>`
                }
              }
            ]
          },
          {
            blocks: [
              {
                id: 'conversion-calculation',
                type: 'richText',
                data: {
                  content: `<h2>Calculating Conversion Rates</h2>
                  <p>Now let's calculate the key conversion rate: <strong>Start-to-Complete Rate</strong></p>
                  <p>This tells us what percentage of users who began a payment actually finished it.</p>
                  <p><strong>Formula:</strong> (Completed ÷ Started) × 100</p>
                  <p><strong>Our data:</strong></p>
                  <ul>
                    <li>Started: 37,500 users</li>
                    <li>Completed: 30,000 users</li>
                  </ul>`
                }
              }
            ]
          },
          {
            blocks: [
              {
                id: 'task-1-q1',
                type: 'multipleChoice',
                data: {
                  question: 'Based on the data, what is the Start-to-Complete conversion rate for the bill payment feature?',
                  description: 'Calculate: (30,000 ÷ 37,500) × 100',
                  options: [
                    { id: 'a', text: '60%' },
                    { id: 'b', text: '75%' },
                    { id: 'c', text: '80%' },
                    { id: 'd', text: '85%' }
                  ],
                  correctAnswer: 'c',
                  hint: 'Divide 30,000 by 37,500, then multiply by 100'
                }
              }
            ]
          },
          {
            blocks: [
              {
                id: 'team-insight-2',
                type: 'scenarioBrief',
                data: {
                  title: 'Team Insight',
                  dialogues: [
                    {
                      name: 'Rashad',
                      role: 'UX Designer',
                      avatar: '👨‍💻',
                      color: '#10b981',
                      message: '"An 80% completion rate is actually pretty good! But that 5,000 users dropping off at confirmation concerns me. That\'s our last step - they\'re so close to finishing. Something in the design must be causing friction at that critical moment."'
                    }
                  ]
                }
              }
            ]
          },
          {
            blocks: [
              {
                id: 'drop-off-analysis',
                type: 'richText',
                data: {
                  content: `<h2>Analyzing the Drop-off Point</h2>
                  <p>We identified that 5,000 users (about 13% of those who started) dropped off at the payment confirmation screen. This is a critical insight!</p>
                  <h3>Why might users drop off at confirmation?</h3>
                  <ul>
                    <li><strong>Unclear confirmation message:</strong> Users don't understand what will happen next</li>
                    <li><strong>Unexpected fees:</strong> Hidden charges appear at the last moment</li>
                    <li><strong>Long loading time:</strong> Users lose patience waiting for confirmation</li>
                    <li><strong>Security concerns:</strong> Users worry about the safety of their transaction</li>
                    <li><strong>Confusing button placement:</strong> "Confirm" button is hard to find or unclear</li>
                  </ul>
                  <h3>Key Takeaway</h3>
                  <p>Even though 80% complete successfully, we're losing 5,000 potential transactions at the final step. Improving this screen could significantly increase our completion rate.</p>`
                }
              }
            ]
          },
          {
            blocks: [
              {
                id: 'task-1-q2',
                type: 'textInput',
                data: {
                  label: 'What are your top 3 recommendations to improve the bill payment confirmation screen and reduce drop-offs?',
                  placeholder: 'List 3 specific, actionable recommendations based on the data and insights...\n\nExample format:\n1. [Recommendation]\n2. [Recommendation]\n3. [Recommendation]',
                  required: true
                }
              }
            ]
          }
        ]
      },
      {
        id: 'task-2',
        title: 'Task Two',
        blocks: [
          {
            id: 'task-2-intro',
            type: 'richText',
            data: {
              content: `<h2>Task 2: Customer Segmentation Analysis</h2>
              <p>Nigar needs help understanding how different age groups use the mobile app. Let's segment our users and analyze their behavior.</p>
              <h3>User Segmentation Data</h3>
              <p>We've divided our 500,000 users into age groups:</p>
              <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
                <tr style="background: #f3f4f6; font-weight: 600;">
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Age Group</td>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Users</td>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Daily Active Users</td>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Most Used Feature</td>
                </tr>
                <tr>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">18-25</td>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">100,000 (20%)</td>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">45,000 (45%)</td>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Card-to-card transfers</td>
                </tr>
                <tr style="background: #f9fafb;">
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">26-35</td>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">175,000 (35%)</td>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">70,000 (40%)</td>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Bill payments</td>
                </tr>
                <tr>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">36-50</td>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">150,000 (30%)</td>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">48,000 (32%)</td>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Account balance check</td>
                </tr>
                <tr style="background: #f9fafb;">
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">51+</td>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">75,000 (15%)</td>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">12,000 (16%)</td>
                  <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Account balance check</td>
                </tr>
              </table>
              <h3>Understanding DAU (Daily Active Users)</h3>
              <p><strong>Daily Active Users (DAU)</strong> is the percentage of total users who use the app on a given day. It's a key metric for measuring engagement.</p>
              <p>Formula: (Daily Active Users ÷ Total Users) × 100</p>`
            }
          },
          {
            id: 'task-2-q1',
            type: 'multipleChoice',
            data: {
              question: 'Which age group has the HIGHEST engagement rate (DAU percentage)?',
              options: [
                { id: 'a', text: '18-25 years (45% DAU)' },
                { id: 'b', text: '26-35 years (40% DAU)' },
                { id: 'c', text: '36-50 years (32% DAU)' },
                { id: 'd', text: '51+ years (16% DAU)' }
              ],
              correctAnswer: 'a'
            }
          },
          {
            id: 'task-2-q2',
            type: 'multipleChoice',
            data: {
              question: 'Which age group should be the PRIMARY target for Nigar\'s mobile app adoption campaign?',
              description: 'Consider both the size of the segment and their current engagement level.',
              options: [
                { id: 'a', text: '18-25 years - They already have high engagement' },
                { id: 'b', text: '26-35 years - Largest segment with good engagement' },
                { id: 'c', text: '36-50 years - Large segment with room for improvement' },
                { id: 'd', text: '51+ years - Lowest engagement, biggest opportunity' }
              ],
              correctAnswer: 'd',
              hint: 'Think about where you can make the biggest impact'
            }
          },
          {
            id: 'task-2-analysis',
            type: 'textInput',
            data: {
              label: 'Write a brief recommendation for Nigar: What messaging and features should the campaign focus on for the 51+ age group?',
              placeholder: 'Consider their current behavior (mostly checking balances) and how to encourage more feature adoption...',
              required: true
            }
          }
        ]
      }
    ]
  },
  {
    id: 'template-siemens',
    companyId: 'company-5',
    title: 'Commercial Project Manager - Siemens Mobility',
    description: 'Experience working as a Commercial Project Manager at Siemens Mobility. Manage financial success and operational excellence in rail projects.',
    tags: ['Project Management', 'Finance', 'Rail Infrastructure'],
    difficulty: 'Intermediate',
    duration: '30-60 mins',
    status: 'published',
    version: 1,
    stages: [
      {
        id: 'intro-stage-1',
        title: 'Intro & Scenario',
        blocks: [
          {
            id: 'team-overview',
            type: 'teamOverview',
            data: {
              companyName: 'Siemens Mobility',
              projectTitle: 'The Project Delivery team',
              description: 'Driving financial success and operational excellence in Siemens Mobility\'s rail projects.',
              userRole: {
                name: 'Aida',
                title: 'Commercial Project Manager (CPM)',
                avatar: '👤',
                color: '#60a5fa',
                description: 'You are responsible for the commercial success of the project. This means analyzing financial and performance data, identifying risks and opportunities, and ensuring decisions align with Siemens\' standards for financial governance. You\'ll collaborate closely with the team to keep the project on time, on budget, and aligned with customer expectations.'
              },
              teamMembers: [
                {
                  name: 'Alex',
                  title: 'Project manager',
                  avatar: '👨‍💼',
                  color: '#94a3b8',
                  badge: 'TECHNICAL COUNTERPART',
                  description: 'Alex leads the technical delivery of the light rail project. They manage schedules, milestones, and engineering teams, while relying on you to ensure financial health and governance align with technical progress.'
                },
                {
                  name: 'Priya',
                  title: 'Finance lead',
                  avatar: '👩‍💼',
                  color: '#fbbf24',
                  badge: 'FINANCIAL DATA PARTNER',
                  description: 'Priya provides the financial reports, forecasts, and compliance checks you need for KPI analysis and EAC reporting. They look to you to interpret data in a way that supports decision-making across the project.'
                },
                {
                  name: 'Marcus',
                  title: 'Contract manager',
                  avatar: '👨‍💼',
                  color: '#34d399',
                  badge: 'RISK AND COMPLIANCE ADVISOR',
                  description: 'Marcus ensures the project complies with contract terms, identifies claims, and helps mitigate commercial risks. You collaborate with Marcus when evaluating risks and opportunities in your reports.'
                }
              ]
            }
          },
          {
            id: 'scenario-brief',
            type: 'scenarioBrief',
            data: {
              title: 'Scenario brief',
              introduction: '<p>You\'ve just joined the Project Delivery team at Siemens Mobility as a <strong>Commercial Project Manager (CPM)</strong>. The team is preparing for a major <strong>light rail project valued at over $100M</strong>, with milestones stretching across several years. Your responsibility is to keep the project financially on track while collaborating with your team on risks, opportunities, and progress updates.</p>',
              dialogues: [
                {
                  name: 'Alex',
                  role: 'Project Manager',
                  avatar: '👨‍💼',
                  color: '#94a3b8',
                  message: '"Glad you\'re on board! The engineering work is moving fast, but I need your help to make sure our finances and KPIs line up with progress. No surprises later."'
                },
                {
                  name: 'Priya',
                  role: 'Financial Lead',
                  avatar: '👩‍💼',
                  color: '#fbbf24',
                  message: '"I\'ve pulled together some initial KPI data. It\'s raw, but it should give you a picture of how the project is trending. I\'ll rely on you to analyze it and highlight what leadership needs to know."'
                },
                {
                  name: 'Marcus',
                  role: 'Contract Manager',
                  avatar: '👨‍💼',
                  color: '#34d399',
                  message: '"Keep an eye out for potential risks. Scope changes and claims can derail projects like this if we\'re not careful. I\'ll loop you in if I spot anything, but I want your take on where the numbers show red flags."'
                }
              ],
              conclusion: 'As the CPM, your challenge is to dive into the project\'s performance data, collaborate with your team to surface risks and opportunities, and translate your analysis into clear, professional reports for leadership. With that context in mind, let\'s move into your first task: <strong>Project planning and KPI analysis</strong>.'
            }
          }
        ]
      },
      {
        id: 'intro-stage-2',
        title: 'Welcome',
        blocks: [
          {
            id: 'role-overview',
            type: 'roleOverview',
            data: {
              title: 'Welcome to the Commercial Project Manager Job Simulation',
              description: 'As a commercial project manager at Siemens Mobility, you\'ll be responsible for the financial and commercial success of large rail infrastructure projects. You\'ll balance detailed data analysis with big-picture strategy, working with project managers, alongside engineers, finance teams, and senior leaders to ensure projects are delivered on time, on budget, and to the highest standards.',
              yourRole: [
                'Oversee the commercial aspects of a <strong>major light rail project</strong>.',
                'Monitor <strong>KPIs and financial performance</strong> throughout the project lifecycle.',
                'Perform effective contract and <strong>claim management</strong>.',
                'Collaborate across functions to address <strong>risks and opportunities</strong>.',
                'Provide <strong>clear updates and recommendations</strong> to leadership.'
              ],
              yourGoal: [
                'Apply project planning tools (<strong>WBS, KPIs</strong>) to assess project health.',
                'Analyze <strong>financial and operational data</strong> to forecast outcomes.',
                'Identify <strong>risks</strong> and propose mitigation <strong>strategies</strong>.',
                'Deliver <strong>professional reports</strong> that inform key decisions.'
              ]
            }
          },
          {
            id: 'transition',
            type: 'transition',
            data: {
              title: 'Let\'s get started!',
              subtitle: 'Now that you have the context, let\'s start your \'First Day\' at work!',
              illustration: 'running'
            }
          }
        ]
      },
      {
        id: 'task-1',
        title: 'Task One',
        blocks: [
          {
            id: 'task-1-intro',
            type: 'richText',
            data: {
              content: `<h2>Task 1: Project Planning & KPI Analysis</h2>
              <p>Your first task is to understand the project structure and analyze key performance indicators (KPIs). You'll learn about Work Breakdown Structure (WBS) and how to assess project health through financial metrics.</p>
              <h3>What is WBS?</h3>
              <p>A <strong>Work Breakdown Structure (WBS)</strong> is a hierarchical decomposition of a project into smaller, manageable components. It helps organize work, assign responsibilities, and track progress.</p>
              <h3>Your Task</h3>
              <p>Review the project WBS and initial KPI data. Identify the top 3 areas that require immediate attention based on the financial indicators.</p>`
            }
          },
          {
            id: 'task-1-assets',
            type: 'asset',
            data: {
              files: [
                { name: 'project-wbs-structure.pdf', url: '#', size: '1.2 MB' },
                { name: 'kpi-dashboard-q1.xlsx', url: '#', size: '2.8 MB' },
                { name: 'wbs-guide.pdf', url: '#', size: '850 KB' }
              ]
            }
          },
          {
            id: 'task-1-question',
            type: 'textInput',
            data: {
              label: 'Based on the WBS and KPI data, what are the top 3 areas requiring immediate attention? Explain your reasoning.',
              placeholder: 'List the 3 areas and provide your analysis for each...',
              required: true
            }
          }
        ]
      },
      {
        id: 'task-2',
        title: 'Task Two',
        blocks: [
          {
            id: 'task-2-intro',
            type: 'richText',
            data: {
              content: `<h2>Task 2: EAC Preparation & Financial Forecasting</h2>
              <p>Now that you understand the project structure, it's time to prepare an Estimate at Completion (EAC) report. This is a critical tool for forecasting final project costs.</p>
              <h3>What is EAC?</h3>
              <p><strong>Estimate at Completion (EAC)</strong> is a forecast of the total project cost based on current performance and remaining work. It helps leadership understand if the project will stay within budget.</p>
              <h3>Your Task</h3>
              <p>Using the provided financial data and templates, prepare an EAC report that includes cost forecasts, variance analysis, and recommendations for cost control.</p>`
            }
          },
          {
            id: 'task-2-assets',
            type: 'asset',
            data: {
              files: [
                { name: 'eac-template.xlsx', url: '#', size: '1.5 MB' },
                { name: 'financial-actuals-q1.xlsx', url: '#', size: '3.2 MB' },
                { name: 'eac-calculation-guide.pdf', url: '#', size: '1.1 MB' }
              ]
            }
          },
          {
            id: 'task-2-upload',
            type: 'fileUpload',
            data: {
              label: 'Upload your completed EAC report',
              accept: '.xlsx,.pdf',
              required: true
            }
          },
          {
            id: 'task-2-summary',
            type: 'textInput',
            data: {
              label: 'Provide a brief executive summary of your EAC findings and recommendations',
              placeholder: 'Summarize key findings, cost variances, and your recommendations...',
              required: true
            }
          }
        ]
      },
      {
        id: 'finish-line',
        title: 'Finish Line',
        blocks: [
          {
            id: 'completion-message',
            type: 'richText',
            data: {
              content: `<h2>Congratulations!</h2>
              <p>You've completed the Commercial Project Manager simulation. You've learned about:</p>
              <ul>
                <li>Work Breakdown Structure (WBS) and project organization</li>
                <li>KPI analysis and performance monitoring</li>
                <li>Estimate at Completion (EAC) and financial forecasting</li>
                <li>Professional reporting and decision-making</li>
              </ul>
              <p>These skills are essential for managing complex infrastructure projects at Siemens Mobility.</p>`
            }
          }
        ]
      }
    ]
  },
  {
    id: 'template-socar',
    companyId: 'company-2',
    title: 'Financial Analyst - SOCAR',
    description: 'Work as a financial analyst at the State Oil Company of Azerbaijan Republic (SOCAR). Analyze energy market data, create financial models, and present strategic recommendations.',
    tags: ['Finance', 'Energy Sector', 'Data Analysis'],
    difficulty: 'Advanced',
    duration: '4-5 hours',
    status: 'published',
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
  }
];

export const companies = [
  { id: 'company-1', name: 'Pasha Bank', industry: 'Banking & Fintech' },
  { id: 'company-2', name: 'SOCAR', industry: 'Oil & Gas' },
  { id: 'company-3', name: 'Azercell', industry: 'Telecommunications' },
  { id: 'company-4', name: 'Kontakt Home', industry: 'Retail & E-commerce' },
  { id: 'company-5', name: 'Siemens Mobility', industry: 'Rail & Infrastructure' },
  { id: 'company-6', name: 'ABB Bank', industry: 'Banking & Digital Finance' }
];
