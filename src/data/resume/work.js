/**
 * @typedef {Object} Position
 * Conforms to https://jsonresume.org/schema/
 *
 * @property {string} name - Name of the company
 * @property {string} position - Position title
 * @property {string} url - Company website
 * @property {string} startDate - Start date of the position in YYYY-MM-DD format
 * @property {string|undefined} endDate - End date of the position in YYYY-MM-DD format.
 * If undefined, the position is still active.
 * @property {string|undefined} summary - html/markdown summary of the position
 * @property {string[]} highlights - plain text highlights of the position (bulleted list)
 */
const work = [
  {
    name: 'Loxon Solutions Zrt.',
    position: 'Staff Software Engineer',
    url: 'https://www.loxon.eu/',
    startDate: '2022-08-01',
    highlights: [
      'Contributed to the design of the AWS architecture for our system.',
      'Utilized various AWS services such as VPC, EC2, EKS, S3, Lambda, IAM, EFS, RDS, MSK, Redshift, DynamoDB, QuickSight, Route 53, Secret/System Manager, Kinesis, and EventBridge.',
      'Worked extensively with NoSQL databases.',
      'Played a pivotal role in transitioning our running services from Docker Swarm to Kubernetes. This was achieved through on-prem deployment using the Rancher cluster and AWS deployment using EKS.',
      'Utilized Argo CD as a declarative, GitOps continuous delivery tool for Kubernetes.',
      'Designed and implemented Helm templates for efficient application deployment.',
      'Developed proficiency in Terraform, CloudFormation, and Terragrunt.',
      'Designed and developed microservices for large business functions.',
      'Contributed to a comprehensive component upgrade which involved upgrading Java, Kafka, Spring Boot, and Debezium.',
    ],
  },
  {
    name: 'Loxon Solutions Zrt.',
    position: 'Senior Software Engineer',
    url: 'https://www.loxon.eu/',
    startDate: '2021-08-01',
    endDate: '2022-07-31',
    highlights: [
      'Demonstrated proficiency in developing REST APIs for various projects.',
      'Skilled in utilizing Talend ETL tool to efficiently and effectively transfer large volumes of data between the bank\'s and our databases.',
      'Played a key role in the technical development of the initial project for ING Spain as a developer.',
      'Joined the product development team upon project implementation and contributed to its success.',
      'Collaborated in the development of a cutting-edge cloud-native Collection System on AWS as a part of a new team.',
      'Utilized Microservices architecture, Spring Boot for backend development, and Angular for frontend development.',
      'Involved in both frontend and backend development efforts to ensure seamless product development.',
    ],
  },
  {
    name: 'Loxon Solutions Zrt.',
    position: 'Software Engineer',
    url: 'https://www.loxon.eu/',
    startDate: '2019-04-01',
    endDate: '2021-07-31',
    highlights: [
      'Expanded my expertise in Oracle database and contributed to database design with hundreds of millions of rows of tables.',
      'Developed native SQL statements for application queries, stored procedures, functions, etc.',
      'Applied advanced indexing and various database optimization techniques.',
      'Initiated work with MSSQL databases.',
      'Successfully implemented Keycloak for authentication and authorization purposes, including the use of Single Sign-On (SSO).',
      'Gained valuable experience by being present at the go-live launch of our system at ING Bank in Poland, which later became a regular occurrence until the COVID pandemic.',
    ],
  },
  {
    name: 'Loxon Solutions Zrt.',
    position: 'Software Developer',
    url: 'https://www.loxon.eu/',
    startDate: '2017-06-01',
    endDate: '2019-03-31',
    highlights: [
      'Secured my first job that allowed me to apply my university education in practice',
      'Contributed to implementation projects, where I helped deliver on-prem Collection Systems to multiple banks.',
      'Worked with Java EE technology for both frontend (using PrimeFaces) and backend development.',
      'Initiated my journey to improve my expertise in Oracle database management.',
      'Created various web services during my work.',
      'Configured application servers (such as WildFly, JBoss, and WebLogic) for single and multiple nodes.',
    ],
  },
  {
    name: 'MELECS EWS GmbH',
    position: 'Intern',
    url: 'https://melecs.com/about-us/',
    startDate: '2016-05-01',
    endDate: '2016-08-31',
    highlights: [
      'Developed a monitoring software for a production line that assembles SMT components',
      'Extracted data from a special database and integrated it into the monitoring application',
      'Wrote the application in C#.',
      'Implemented email and SMS notifications to alert relevant colleagues of defective components after a specified threshold.',
    ],
  },
];

export default work;
