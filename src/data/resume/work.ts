/**
 * Conforms to https://jsonresume.org/schema/
 */
export interface Position {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

const work: Position[] = [
  {
    name: 'Loxon Solutions Zrt.',
    position: 'Senior DevOps Engineer',
    url: 'https://www.loxon.eu/',
    startDate: '2025-07-01',
    summary: 'Leading AWS multi-region infrastructure initiatives and DevOps practices, maintaining multi-tenant environments serving multiple clients across Indonesia while mentoring team members and driving technical excellence.',
    highlights: [
      'Architecting and managing AWS multi-region, multi-tenant infrastructure for enterprise SaaS deployments',
      'Maintaining multi-tenant AWS environments serving major clients including Grab across Indonesia',
      'Leading Kubernetes infrastructure optimization and scaling initiatives across AWS regions',
      'Designing advanced GitOps workflows and CI/CD pipelines for complex microservices architectures',
      'Mentoring DevOps engineers and establishing best practices for infrastructure automation',
      'Driving adoption of modern cloud-native technologies and infrastructure-as-code standards',
    ],
  },
  {
    name: 'Loxon Solutions Zrt.',
    position: 'DevOps Engineer',
    url: 'https://www.loxon.eu/',
    startDate: '2024-08-01',
    endDate: '2025-06-30',
    summary: 'Spearheaded cloud infrastructure design and Kubernetes migration, establishing robust DevOps practices and implementing comprehensive AWS architecture for enterprise-scale systems.',
    highlights: [
      'Designed AWS architecture utilizing VPC, EKS, S3, Lambda, RDS, MSK, Redshift, DynamoDB, Kinesis, and EventBridge',
      'Led migration from Docker Swarm to Kubernetes (Rancher on-prem, EKS on AWS)',
      'Implemented GitOps with Argo CD and maintained Helm charts for application deployments',
      'Built IaC automation using Terraform, CloudFormation, and Terragrunt',
      'Established CI/CD pipelines with Jenkins for automated testing and deployment',
      'Optimized system monitoring, logging, and troubleshooting for high availability',
    ],
  },
  {
    name: 'Loxon Solutions Zrt.',
    position: 'Staff Software Engineer',
    url: 'https://www.loxon.eu/',
    startDate: '2022-08-01',
    endDate: '2024-07-31',
    summary: 'Architected and delivered enterprise-grade microservices on AWS cloud infrastructure, focusing on scalable data solutions, event-driven architectures, and business intelligence capabilities.',
    highlights: [
      'Designed microservices using Java and Spring Boot for large-scale business functions',
      'Built database solutions with MongoDB, Redshift, MariaDB, and PostgreSQL',
      'Implemented AWS cloud infrastructure (VPC, EC2, S3, RDS, MSK, DynamoDB)',
      'Delivered event-driven architectures using AWS Kinesis, EventBridge, and Kafka',
      'Created BI dashboards with AWS QuickSight for data-driven decision-making',
      'Led major upgrades for Java, Kafka, Spring Boot, and Debezium components',
    ],
  },
  {
    name: 'Loxon Solutions Zrt.',
    position: 'Senior Software Engineer',
    url: 'https://www.loxon.eu/',
    startDate: '2021-08-01',
    endDate: '2022-07-31',
    summary: 'Contributed to cloud-native system development for ING Spain, working across full-stack development with microservices architecture and leading ETL integration efforts.',
    highlights: [
      'Developed REST APIs for multiple projects using microservices architecture',
      'Implemented ETL pipelines with Talend for high-volume data transfers',
      'Led technical development for ING Spain project as core developer',
      'Built cloud-native Collection System on AWS with Spring Boot and Angular',
      'Delivered full-stack solutions across frontend and backend development',
    ],
  },
  {
    name: 'Loxon Solutions Zrt.',
    position: 'Software Engineer',
    url: 'https://www.loxon.eu/',
    startDate: '2019-04-01',
    endDate: '2021-07-31',
    summary: 'Advanced database engineering and authentication systems, specializing in Oracle optimization and implementing enterprise security solutions for banking clients across Europe.',
    highlights: [
      'Designed Oracle databases handling hundreds of millions of rows with advanced optimization',
      'Developed native SQL statements, stored procedures, and functions',
      'Implemented Keycloak for SSO authentication and authorization',
      'Supported go-live launches at ING Bank Poland and other banking clients',
      'Applied advanced indexing and optimization techniques for high-performance queries',
    ],
  },
  {
    name: 'Loxon Solutions Zrt.',
    position: 'Software Developer',
    url: 'https://www.loxon.eu/',
    startDate: '2017-06-01',
    endDate: '2019-03-31',
    summary: 'Started professional career delivering on-premise Collection Systems to banking clients, working with Java EE full-stack development and establishing foundational skills in enterprise application deployment.',
    highlights: [
      'Delivered on-prem Collection Systems to multiple banking clients',
      'Developed full-stack solutions with Java EE and PrimeFaces',
      'Built web services and integrated backend systems',
      'Configured application servers (WildFly, JBoss, WebLogic) for multi-node deployments',
      'Established Oracle database expertise and enterprise development practices',
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
