export const fixedTemplates = [
  {
    id: 'template-elementary',
    level: 'Elementary',
    title: 'Elementary Level Simulation Template',
    description: 'Perfect for entry-level positions. Covers basic concepts and introductory skills.',
    difficulty: 'Beginner',
    duration: '30-45 mins',
    taskCount: 2,
    features: [
      'Basic industry concepts',
      'Simple task submissions',
      'Introductory scenarios',
      'Multiple choice and short text responses'
    ],
    stages: [
      {
        id: 'intro-stage-1',
        title: 'Intro & Scenario',
        blocks: [
          {
            id: 'team-overview',
            type: 'teamOverview',
            data: {
              companyName: '[Company Name]',
              projectTitle: '[Team Name]',
              description: '[Team description and mission]',
              userRole: {
                name: 'You',
                title: '[Your Role Title]',
                avatar: '👤',
                color: '#3b82f6',
                description: '[Your role description and responsibilities]'
              },
              teamMembers: [
                {
                  name: '[Team Member 1]',
                  title: '[Their Role]',
                  avatar: '👨‍💼',
                  color: '#8b5cf6',
                  badge: '[BADGE TEXT]',
                  description: '[Their role and how they work with you]'
                },
                {
                  name: '[Team Member 2]',
                  title: '[Their Role]',
                  avatar: '👩‍💼',
                  color: '#10b981',
                  badge: '[BADGE TEXT]',
                  description: '[Their role and how they work with you]'
                }
              ]
            }
          },
          {
            id: 'scenario-brief',
            type: 'scenarioBrief',
            data: {
              title: 'Scenario brief',
              introduction: '<p>[Introduce the scenario, company context, and what the user will be working on]</p>',
              dialogues: [
                {
                  name: '[Team Member 1]',
                  role: '[Their Role]',
                  avatar: '👨‍💼',
                  color: '#8b5cf6',
                  message: '"[Their message about what they need from you]"'
                },
                {
                  name: '[Team Member 2]',
                  role: '[Their Role]',
                  avatar: '👩‍💼',
                  color: '#10b981',
                  message: '"[Their message about expectations]"'
                }
              ],
              conclusion: '[Wrap up the scenario and transition to the role overview]'
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
              title: 'Welcome to the [Role Title] Job Simulation',
              description: '[Describe what this role does and why it matters]',
              yourRole: [
                '[Key responsibility 1]',
                '[Key responsibility 2]',
                '[Key responsibility 3]',
                '[Key responsibility 4]'
              ],
              yourGoal: [
                '[Learning objective 1]',
                '[Learning objective 2]',
                '[Learning objective 3]',
                '[Learning objective 4]'
              ]
            }
          },
          {
            id: 'transition',
            type: 'transition',
            data: {
              title: 'Let\'s get started!',
              subtitle: 'Now that you understand your role, let\'s dive into your first task!',
              illustration: '🚀'
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
              content: `<h2>Task 1: [Task Title]</h2>
              <p>[Explain what the user needs to do in this task]</p>
              <h3>[Key Concept Title]</h3>
              <p>[Explain the key concept they need to understand]</p>
              <h3>Your Task</h3>
              <p>[Clear instructions on what to deliver]</p>`
            }
          },
          {
            id: 'task-1-question',
            type: 'multipleChoice',
            data: {
              question: '[Your question here]',
              description: '[Additional context if needed]',
              options: ['[Option 1]', '[Option 2]', '[Option 3]', '[Option 4]'],
              multiSelect: false
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
              content: `<h2>Task 2: [Task Title]</h2>
              <p>[Explain the second task and its importance]</p>
              <h3>Your Task</h3>
              <p>[Clear instructions]</p>`
            }
          },
          {
            id: 'task-2-input',
            type: 'textInput',
            data: {
              label: '[What should they write about?]',
              placeholder: '[Guidance on what to include...]',
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
              <p>You've completed the [Role Title] simulation. You've learned about:</p>
              <ul>
                <li>[Key learning 1]</li>
                <li>[Key learning 2]</li>
                <li>[Key learning 3]</li>
              </ul>
              <p>[Closing message about the value of these skills]</p>`
            }
          }
        ]
      }
    ]
  },
  {
    id: 'template-intermediate',
    level: 'Intermediate',
    title: 'Intermediate Level Simulation Template',
    description: 'For candidates with some experience. Includes applied skills and real-world scenarios.',
    difficulty: 'Intermediate',
    duration: '45-75 mins',
    taskCount: 4,
    features: [
      'Real-world scenarios',
      'Data analysis tasks',
      'File submissions required',
      'Strategic thinking exercises'
    ],
    stages: [
      {
        id: 'intro-stage-1',
        title: 'Intro & Scenario',
        blocks: [
          {
            id: 'team-overview',
            type: 'teamOverview',
            data: {
              companyName: '[Company Name]',
              projectTitle: '[Team/Project Name]',
              description: '[Team mission and project context]',
              userRole: {
                name: 'You',
                title: '[Your Role Title]',
                avatar: '👤',
                color: '#60a5fa',
                description: '[Detailed role description with responsibilities and impact]'
              },
              teamMembers: [
                {
                  name: '[Team Member 1]',
                  title: '[Their Role]',
                  avatar: '👨‍💼',
                  color: '#94a3b8',
                  badge: '[BADGE TEXT]',
                  description: '[How they collaborate with you]'
                },
                {
                  name: '[Team Member 2]',
                  title: '[Their Role]',
                  avatar: '👩‍💼',
                  color: '#fbbf24',
                  badge: '[BADGE TEXT]',
                  description: '[Their expertise and collaboration]'
                },
                {
                  name: '[Team Member 3]',
                  title: '[Their Role]',
                  avatar: '👨‍💼',
                  color: '#34d399',
                  badge: '[BADGE TEXT]',
                  description: '[Their role in the project]'
                }
              ]
            }
          },
          {
            id: 'scenario-brief',
            type: 'scenarioBrief',
            data: {
              title: 'Scenario brief',
              introduction: '<p>[Detailed scenario with business context, challenges, and objectives]</p>',
              dialogues: [
                {
                  name: '[Team Member 1]',
                  role: '[Their Role]',
                  avatar: '👨‍💼',
                  color: '#94a3b8',
                  message: '"[Their perspective and needs]"'
                },
                {
                  name: '[Team Member 2]',
                  role: '[Their Role]',
                  avatar: '👩‍💼',
                  color: '#fbbf24',
                  message: '"[Their input and expectations]"'
                },
                {
                  name: '[Team Member 3]',
                  role: '[Their Role]',
                  avatar: '👨‍💼',
                  color: '#34d399',
                  message: '"[Their concerns and requirements]"'
                }
              ],
              conclusion: '[Summary of the challenge and transition to role overview]'
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
              title: 'Welcome to the [Role Title] Job Simulation',
              description: '[Comprehensive role description with business impact]',
              yourRole: [
                '[Strategic responsibility 1]',
                '[Analytical responsibility 2]',
                '[Collaborative responsibility 3]',
                '[Decision-making responsibility 4]',
                '[Communication responsibility 5]'
              ],
              yourGoal: [
                '[Advanced learning objective 1]',
                '[Applied skill objective 2]',
                '[Strategic thinking objective 3]',
                '[Professional communication objective 4]'
              ]
            }
          },
          {
            id: 'transition',
            type: 'transition',
            data: {
              title: 'Let\'s get started!',
              subtitle: 'Now that you have the context, let\'s start your first day at work!',
              illustration: '🚀'
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
              content: `<h2>Task 1: [Task Title]</h2>
              <p>[Detailed task description with business context]</p>
              <h3>[Key Concept/Framework]</h3>
              <p>[Explain the methodology or framework]</p>
              <h3>Your Task</h3>
              <p>[Specific deliverables and expectations]</p>`
            }
          },
          {
            id: 'task-1-assets',
            type: 'asset',
            data: {
              files: [
                { name: '[document-1].pdf', url: '#', size: '1.2 MB' },
                { name: '[spreadsheet-1].xlsx', url: '#', size: '2.8 MB' },
                { name: '[guide-1].pdf', url: '#', size: '850 KB' }
              ]
            }
          },
          {
            id: 'task-1-question',
            type: 'textInput',
            data: {
              label: '[What analysis or insights should they provide?]',
              placeholder: '[Guidance on structure and content...]',
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
              content: `<h2>Task 2: [Task Title]</h2>
              <p>[Task description building on previous work]</p>
              <h3>[Key Concept]</h3>
              <p>[Explain the concept or tool]</p>
              <h3>Your Task</h3>
              <p>[Deliverable requirements]</p>`
            }
          },
          {
            id: 'task-2-assets',
            type: 'asset',
            data: {
              files: [
                { name: '[template].xlsx', url: '#', size: '1.5 MB' },
                { name: '[data-file].xlsx', url: '#', size: '3.2 MB' }
              ]
            }
          },
          {
            id: 'task-2-upload',
            type: 'fileUpload',
            data: {
              label: 'Upload your completed [deliverable name]',
              accept: '.xlsx,.pdf',
              required: true
            }
          }
        ]
      },
      {
        id: 'task-3',
        title: 'Task Three',
        blocks: [
          {
            id: 'task-3-intro',
            type: 'richText',
            data: {
              content: `<h2>Task 3: [Task Title]</h2>
              <p>[Task description]</p>
              <h3>Your Task</h3>
              <p>[Requirements]</p>`
            }
          },
          {
            id: 'task-3-question',
            type: 'textInput',
            data: {
              label: '[What should they analyze or recommend?]',
              placeholder: '[Guidance...]',
              required: true
            }
          }
        ]
      },
      {
        id: 'task-4',
        title: 'Task Four',
        blocks: [
          {
            id: 'task-4-intro',
            type: 'richText',
            data: {
              content: `<h2>Task 4: [Final Task Title]</h2>
              <p>[Comprehensive final task]</p>
              <h3>Your Task</h3>
              <p>[Final deliverable requirements]</p>`
            }
          },
          {
            id: 'task-4-upload',
            type: 'fileUpload',
            data: {
              label: 'Upload your final [deliverable]',
              accept: '.pdf,.pptx',
              required: true
            }
          },
          {
            id: 'task-4-summary',
            type: 'textInput',
            data: {
              label: 'Provide an executive summary',
              placeholder: '[Summary guidance...]',
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
              <p>You've completed the [Role Title] simulation. You've demonstrated:</p>
              <ul>
                <li>[Skill 1]</li>
                <li>[Skill 2]</li>
                <li>[Skill 3]</li>
                <li>[Skill 4]</li>
              </ul>
              <p>[Impact statement about these skills]</p>`
            }
          }
        ]
      }
    ]
  },
  {
    id: 'template-advanced',
    level: 'Advanced',
    title: 'Advanced Level Simulation Template',
    description: 'For experienced professionals. Complex scenarios requiring strategic thinking and comprehensive deliverables.',
    difficulty: 'Advanced',
    duration: '90-120 mins',
    taskCount: 5,
    features: [
      'Complex business scenarios',
      'Multiple stakeholder management',
      'Strategic decision-making',
      'Comprehensive reports and presentations'
    ],
    stages: [
      {
        id: 'intro-stage-1',
        title: 'Intro & Scenario',
        blocks: [
          {
            id: 'team-overview',
            type: 'teamOverview',
            data: {
              companyName: '[Company Name]',
              projectTitle: '[Strategic Project/Initiative Name]',
              description: '[High-level project description with business impact]',
              userRole: {
                name: 'You',
                title: '[Senior Role Title]',
                avatar: '👤',
                color: '#60a5fa',
                description: '[Strategic role description with leadership responsibilities]'
              },
              teamMembers: [
                {
                  name: '[Senior Stakeholder 1]',
                  title: '[Their Role]',
                  avatar: '👨‍💼',
                  color: '#94a3b8',
                  badge: '[BADGE]',
                  description: '[Their strategic role]'
                },
                {
                  name: '[Key Partner 2]',
                  title: '[Their Role]',
                  avatar: '👩‍💼',
                  color: '#fbbf24',
                  badge: '[BADGE]',
                  description: '[Their expertise]'
                },
                {
                  name: '[Team Lead 3]',
                  title: '[Their Role]',
                  avatar: '👨‍💼',
                  color: '#34d399',
                  badge: '[BADGE]',
                  description: '[Their responsibilities]'
                },
                {
                  name: '[Specialist 4]',
                  title: '[Their Role]',
                  avatar: '👩‍💼',
                  color: '#f59e0b',
                  badge: '[BADGE]',
                  description: '[Their contribution]'
                }
              ]
            }
          },
          {
            id: 'scenario-brief',
            type: 'scenarioBrief',
            data: {
              title: 'Scenario brief',
              introduction: '<p>[Complex business scenario with market context, competitive landscape, and strategic challenges]</p>',
              dialogues: [
                {
                  name: '[Stakeholder 1]',
                  role: '[Their Role]',
                  avatar: '👨‍💼',
                  color: '#94a3b8',
                  message: '"[Strategic perspective and expectations]"'
                },
                {
                  name: '[Stakeholder 2]',
                  role: '[Their Role]',
                  avatar: '👩‍💼',
                  color: '#fbbf24',
                  message: '"[Technical or financial perspective]"'
                },
                {
                  name: '[Stakeholder 3]',
                  role: '[Their Role]',
                  avatar: '👨‍💼',
                  color: '#34d399',
                  message: '"[Operational or risk perspective]"'
                },
                {
                  name: '[Stakeholder 4]',
                  role: '[Their Role]',
                  avatar: '👩‍💼',
                  color: '#f59e0b',
                  message: '"[Customer or market perspective]"'
                }
              ],
              conclusion: '[Summary of the strategic challenge and your role in addressing it]'
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
              title: 'Welcome to the [Senior Role Title] Job Simulation',
              description: '[Comprehensive description of the strategic role and its business impact]',
              yourRole: [
                '[Strategic leadership responsibility 1]',
                '[Cross-functional collaboration responsibility 2]',
                '[Data-driven decision making responsibility 3]',
                '[Stakeholder management responsibility 4]',
                '[Change management responsibility 5]',
                '[Risk assessment responsibility 6]'
              ],
              yourGoal: [
                '[Advanced strategic objective 1]',
                '[Complex analysis objective 2]',
                '[Leadership communication objective 3]',
                '[Innovation and problem-solving objective 4]',
                '[Business impact objective 5]'
              ]
            }
          },
          {
            id: 'transition',
            type: 'transition',
            data: {
              title: 'Let\'s get started!',
              subtitle: 'You\'re stepping into a critical role. Let\'s tackle this challenge!',
              illustration: '🎯'
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
              content: `<h2>Task 1: [Strategic Analysis Task]</h2>
              <p>[Comprehensive task description with business context]</p>
              <h3>[Framework/Methodology]</h3>
              <p>[Detailed explanation of the analytical approach]</p>
              <h3>Your Task</h3>
              <p>[Specific deliverables with quality expectations]</p>`
            }
          },
          {
            id: 'task-1-assets',
            type: 'asset',
            data: {
              files: [
                { name: '[market-data].xlsx', url: '#', size: '4.2 MB' },
                { name: '[competitor-analysis].pdf', url: '#', size: '2.8 MB' },
                { name: '[financial-reports].xlsx', url: '#', size: '3.5 MB' },
                { name: '[framework-guide].pdf', url: '#', size: '1.8 MB' }
              ]
            }
          },
          {
            id: 'task-1-deliverable',
            type: 'textInput',
            data: {
              label: '[Strategic analysis question]',
              placeholder: '[Detailed guidance on structure, depth, and format...]',
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
              content: `<h2>Task 2: [Data Analysis & Forecasting]</h2>
              <p>[Task building on previous analysis]</p>
              <h3>Your Task</h3>
              <p>[Complex deliverable requirements]</p>`
            }
          },
          {
            id: 'task-2-assets',
            type: 'asset',
            data: {
              files: [
                { name: '[template].xlsx', url: '#', size: '2.5 MB' },
                { name: '[historical-data].xlsx', url: '#', size: '5.2 MB' }
              ]
            }
          },
          {
            id: 'task-2-upload',
            type: 'fileUpload',
            data: {
              label: 'Upload your analysis and forecast model',
              accept: '.xlsx,.pdf',
              required: true
            }
          },
          {
            id: 'task-2-summary',
            type: 'textInput',
            data: {
              label: 'Summarize your key findings and recommendations',
              placeholder: '[Executive summary guidance...]',
              required: true
            }
          }
        ]
      },
      {
        id: 'task-3',
        title: 'Task Three',
        blocks: [
          {
            id: 'task-3-intro',
            type: 'richText',
            data: {
              content: `<h2>Task 3: [Risk Assessment & Mitigation]</h2>
              <p>[Risk analysis requirements]</p>
              <h3>Your Task</h3>
              <p>[Deliverables]</p>`
            }
          },
          {
            id: 'task-3-question',
            type: 'textInput',
            data: {
              label: '[Risk assessment question]',
              placeholder: '[Guidance on risk framework...]',
              required: true
            }
          }
        ]
      },
      {
        id: 'task-4',
        title: 'Task Four',
        blocks: [
          {
            id: 'task-4-intro',
            type: 'richText',
            data: {
              content: `<h2>Task 4: [Strategic Recommendation]</h2>
              <p>[Strategic planning task]</p>
              <h3>Your Task</h3>
              <p>[Comprehensive plan requirements]</p>`
            }
          },
          {
            id: 'task-4-upload',
            type: 'fileUpload',
            data: {
              label: 'Upload your strategic plan',
              accept: '.pdf,.pptx',
              required: true
            }
          }
        ]
      },
      {
        id: 'task-5',
        title: 'Task Five',
        blocks: [
          {
            id: 'task-5-intro',
            type: 'richText',
            data: {
              content: `<h2>Task 5: [Executive Presentation]</h2>
              <p>[Final comprehensive deliverable]</p>
              <h3>Your Task</h3>
              <p>[Presentation requirements for leadership]</p>`
            }
          },
          {
            id: 'task-5-upload',
            type: 'fileUpload',
            data: {
              label: 'Upload your executive presentation',
              accept: '.pdf,.pptx',
              required: true
            }
          },
          {
            id: 'task-5-summary',
            type: 'textInput',
            data: {
              label: 'Provide your executive summary and key recommendations',
              placeholder: '[Concise summary for C-level stakeholders...]',
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
              content: `<h2>Outstanding Work!</h2>
              <p>You've completed an advanced [Role Title] simulation. You've demonstrated:</p>
              <ul>
                <li>[Advanced skill 1]</li>
                <li>[Strategic capability 2]</li>
                <li>[Leadership quality 3]</li>
                <li>[Analytical expertise 4]</li>
                <li>[Communication excellence 5]</li>
              </ul>
              <p>[Statement about readiness for senior roles]</p>`
            }
          }
        ]
      }
    ]
  }
];
