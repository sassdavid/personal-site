export const aboutMarkdown = `# Intro

I am a Senior DevOps Engineer at [Loxon](https://loxon.eu/), where I look after the cloud infrastructure and delivery pipelines behind our
lending and collection software. Day to day that means [Terraform](https://www.terraform.io/) and [Terragrunt](https://terragrunt.gruntwork.io/)
modules, [Helm](https://helm.sh/) charts, [Kubernetes](https://kubernetes.io/) on [Amazon EKS](https://aws.amazon.com/eks/), and the
[Argo CD](https://argo-cd.readthedocs.io/en/stable/) and [Jenkins](https://www.jenkins.io/) pipelines that carry a merged change into a running
environment. [Python](https://www.python.org/) and Bash cover whatever does not fit into a module.

I did not start on this side of the wall. My first five years at the company went into Java, Oracle and getting on-premise systems live at banks,
and that is still the most useful thing I bring to infrastructure work: I have had to operate the software I now automate, so I have a fair idea
of which shortcuts get paid for later.

If you are working on something in the same space, or you just want to argue about how to lay out a Terragrunt repository, my inbox is open.

# Currently

Most of my time goes to the [AWS](https://aws.amazon.com/) estates our product runs on — several accounts, several regions, and clients in
banking and fintech spread across Europe, the Middle East and Asia. Each of them wants the same platform with different constraints, so the work
is less about building one system than about keeping a dozen versions of it honest.

The other half is the internal module library: versioned Terraform modules for EKS, RDS, EFS, MSK, VPC and networking, and the migrations that
move live environments onto a new major version without an outage. Recent additions have been Karpenter and dedicated CPU and GPU node groups for
AI and analytics workloads, tighter secrets handling with customer-managed KMS keys and External Secrets, and a fair amount of Jenkins tooling that
now provisions and tears down environments on its own.

The rest is the unglamorous half of the job, and often the most interesting: reviewing infrastructure changes, tracing a production incident
through logs in Athena, cutting IAM policies back to what they actually need, and explaining to a client team why their ingress does not behave
the way they expected.

# Hungary

I grew up in Eger, a small town in northern Hungary that people know for its castle and its red wine. I studied computer science engineering in
Győr, at Széchenyi István University, and I have lived in Budapest since I started working. Most of my family is still a two-hour drive away, which
is roughly the right distance.

Hungarian is my first language, and most of what I cook comes from that side of things — although the sourdough and the pizza have taken over the
weekends. When I need to leave the city, it is usually the Mátra hills to the north, Lake Balaton in the summer, or Tokaj in the autumn, when the
vineyards are worth the drive on their own.

# I Like

- Lifting at the gym, three or four times a week.
- Running, mostly to have an excuse to learn a new route.
- Travelling, and the weeks of planning that come before it.
- Summer, and everything that goes with it: hiking, swimming, sitting outside until it gets dark.
- Baking. Sourdough first, then everything else.
- Cooking for family and friends, ideally with them in the kitchen.

# Travel / Geography

- Thirteen countries so far, Hungary included. Only two of them are outside Europe, which I would like to fix.
- In 2016, I visited Austria.
- In 2018, I travelled to Poland and to Sardinia.
- In 2019, I saw Mallorca in the spring and Rome in the autumn.
- In 2020, I got to Milan before the borders closed, and spent the rest of that summer at Lake Balaton.
- In 2021, I visited Lefkada and Croatia, with a long weekend in Hajdúszoboszló.
- In 2022, I travelled to Scotland, Tunisia and Croatia again, and spent the shoulder seasons in the Mátra and in Szeged.
- In 2023, I made it to Pisa, the High Tatras, Stuttgart and Strasbourg.
- In 2024, I spent March in Alicante and the end of the summer around Naples. We got married in October, and went back to the Mátra afterwards.
- In 2025, the Maldives in February, Athens in July, and Mád in the Tokaj wine region in October.
- In 2026, the Dolomites, out of Ortisei. The Seychelles is the plan for later this year.

# Fun Facts

- I have done [Advent of Code](https://adventofcode.com/) every December since the first one in 2015. Some years I finish; every year I learn
  something about how I actually think under time pressure.
- My sourdough starter dates from the first spring of the pandemic, when I was following Szabi a Pék like everyone else in Hungary. It is six years
  old now, which makes it older than most of the infrastructure I maintain.
- The same starter turned into a Neapolitan pizza habit that has been going for years. It is a weekly ritual, the dough is a 72-hour cold ferment,
  and I am still adjusting it.
- In 2023, I jumped out of a plane on a tandem skydive. It was a great feeling, and I want to feel it again.

# I Dream Of

- Building infrastructure a colleague can pick up and run without me in the room.
- Getting a little better each year at the parts of this job that are not code.
- More of the year spent outdoors, and a longer list of places on the far side of Europe.
`;
