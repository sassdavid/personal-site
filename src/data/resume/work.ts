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
    url: 'https://loxon.eu/',
    startDate: '2025-07-01',
    summary:
      'Own the AWS platform behind the product: multi-account, multi-region environments for banking and fintech clients across Europe, the Middle East and Asia, plus the Terraform module library and GitOps tooling the delivery teams build on.',
    highlights: [
      'Run multi-account, multi-region AWS environments for enterprise banking and fintech clients',
      'Maintain a versioned Terraform module library (EKS, RDS, EFS, MSK, VPC, networking) and migrate live environments across breaking releases',
      'Extend EKS clusters with Karpenter and dedicated CPU and GPU node groups for AI and analytics workloads',
      'Harden platform security with customer-managed and cross-account KMS keys, External Secrets, and least-privilege IAM reviews',
      'Automate release and environment tooling in Python and Bash, driven from Jenkins and Argo CD',
      'Lead production incident investigation across Athena log analytics, EKS and Terraform state',
      'Mentor engineers and review infrastructure changes against Terraform, Helm and Kubernetes standards',
    ],
  },
  {
    name: 'Loxon Solutions Zrt.',
    position: 'DevOps Engineer',
    url: 'https://loxon.eu/',
    startDate: '2024-08-01',
    endDate: '2025-06-30',
    summary:
      'Led the move to cloud infrastructure and Kubernetes, establishing the DevOps practices and AWS architecture the platform still runs on.',
    highlights: [
      'Designed the AWS architecture using VPC, EKS, S3, Lambda, RDS, MSK, Redshift, DynamoDB, Kinesis, and EventBridge',
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
    url: 'https://loxon.eu/',
    startDate: '2022-08-01',
    endDate: '2024-07-31',
    summary:
      'Architected and delivered enterprise-grade microservices on AWS cloud infrastructure, focusing on scalable data solutions, event-driven architectures, and business intelligence capabilities.',
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
    url: 'https://loxon.eu/',
    startDate: '2021-08-01',
    endDate: '2022-07-31',
    summary:
      'Built cloud-native systems for a Western European retail bank, working across the full stack on a microservices architecture and leading the ETL integration effort.',
    highlights: [
      'Developed REST APIs for multiple projects using microservices architecture',
      'Implemented ETL pipelines with Talend for high-volume data transfers',
      'Led technical development on a European retail banking programme as core developer',
      'Built cloud-native Collection System on AWS with Spring Boot and Angular',
      'Delivered full-stack solutions across frontend and backend development',
    ],
  },
  {
    name: 'Loxon Solutions Zrt.',
    position: 'Software Engineer',
    url: 'https://loxon.eu/',
    startDate: '2019-04-01',
    endDate: '2021-07-31',
    summary:
      'Advanced database engineering and authentication systems, specializing in Oracle optimization and implementing enterprise security solutions for banking clients across Europe.',
    highlights: [
      'Designed Oracle databases handling hundreds of millions of rows with advanced optimization',
      'Developed native SQL statements, stored procedures, and functions',
      'Implemented Keycloak for SSO authentication and authorization',
      'Supported go-live launches at banking clients across Central and Western Europe',
      'Applied advanced indexing and optimization techniques for high-performance queries',
    ],
  },
  {
    name: 'Loxon Solutions Zrt.',
    position: 'Software Developer',
    url: 'https://loxon.eu/',
    startDate: '2017-06-01',
    endDate: '2019-03-31',
    summary:
      'Started professional career delivering on-premise Collection Systems to banking clients, working with Java EE full-stack development and establishing foundational skills in enterprise application deployment.',
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
      'Built monitoring software in C# for a production line assembling SMT components',
      'Extracted data from a proprietary database and integrated it into the monitoring application',
      'Implemented email and SMS alerts that notified the relevant colleagues once defect counts passed a threshold',
    ],
  },
];

export default work;
