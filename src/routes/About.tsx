import { BasePage } from "@/components";
import { Link, Text, TextHeader, TextSubHeader } from "@/components/Text";
import { useProtected } from "@/hooks/useProtected";
import TagManager from "react-gtm-module";

type ProjectCredit = {
  name: string;
  contributors: Array<{
    firstName: string;
    lastName: string;
    href?: string;
    party?: string;
  }>;
};

const projectCredit: Array<ProjectCredit> = [
  {
    name: "VALIDATION SERVER PRODUCTION",
    contributors: [
      {
        firstName: "Silke",
        lastName: "Taylor",
      },
      {
        firstName: "Erika",
        lastName: "Tyagi",
      },
      {
        firstName: "Jean Clayton",
        lastName: "Seraphin",
      },
    ],
  },
  {
    name: "VALIDATION SERVER FRONT END",
    contributors: [
      {
        firstName: "Rebecca",
        lastName: "Lamm",
        party: "Graphicacy",
      },
      {
        firstName: "Chenny",
        lastName: "Langness",
        party: "Graphicacy",
      },
      {
        firstName: "Kat",
        lastName: "Madrid",
        party: "Graphicacy",
      },
      {
        firstName: "Josh",
        lastName: "Miller",
      },
      {
        firstName: "Deena",
        lastName: "Tamaroff",
      },
    ],
  },
  {
    name: "RESEARCH",
    contributors: [
      {
        firstName: "Felipe",
        lastName: "Barrientos",
        party: "Florida State University",
      },
      {
        firstName: "Claire",
        lastName: "Bowen",
      },
      {
        firstName: "Len",
        lastName: "Burman",
      },
      {
        firstName: "Rob",
        lastName: "McClelland",
      },
      {
        firstName: "Madeline",
        lastName: "Pickens",
      },
      {
        firstName: "Joshua",
        lastName: "Snoke",
        party: "RAND Corp.",
      },
      {
        firstName: "Aaron",
        lastName: "Williams",
      },
    ],
  },
  {
    name: "VALIDATION SERVER ADVISORY BOARD MEMBERS:",
    contributors: [
      {
        firstName: "John",
        lastName: "Abowd",
        party: "Cornell University",
      },
      {
        firstName: "Jim",
        lastName: "Cilke",
        party: "Joint Committee on Taxation",
      },
      {
        firstName: "Connie",
        lastName: "Citro",
        party: "Committee on National Statistics",
      },
      {
        firstName: "Jason",
        lastName: "DeBacker",
        party: "University of South Carolina",
      },
      {
        firstName: "Dan",
        lastName: "Feenberg",
        party: "National Bureau of Economic Research",
      },
      {
        firstName: "Max",
        lastName: "Ghenis",
        party: "PolicyEngine",
      },
      {
        firstName: "Matt",
        lastName: "Jensen",
        party: "Open Research Group",
      },
      {
        firstName: "Barry",
        lastName: "Johnson",
        party: "Internal Revenue Service",
      },
      {
        firstName: "Ashwin",
        lastName: "Machanavajjhala",
        party: "Duke University and Tumult Labs",
      },
      {
        firstName: "Robert",
        lastName: "Moffitt",
        party: "Johns Hopkins University",
      },
      {
        firstName: "Amy",
        lastName: "O'Hara",
        party: "Georgetown University",
      },
      {
        firstName: "Mauricio",
        lastName: "Ortiz",
        party: "Bureau of Economic Analysis",
      },
      {
        firstName: "Nancy",
        lastName: "Potok",
        party: "NAPx Consulting",
      },
      {
        firstName: "Jerry",
        lastName: "Reiter",
        party: "Duke University",
      },
      {
        firstName: "Rolando",
        lastName: "Rodriguez",
        party: "Disclosure Avoidance, U.S. Census Bureau",
      },
      {
        firstName: "Emmanuel",
        lastName: "Saez",
        party: "University of California Berkeley",
      },
      {
        firstName: "Wade",
        lastName: "Shen",
        party: "Actuate",
      },
      {
        firstName: "Aleksandra",
        lastName: "Slavkovic",
        party: "The Pennsylvania State University",
      },
      {
        firstName: "Salil",
        lastName: "Vadhan",
        party: "Harvard Universitye",
      },
      {
        firstName: "Lars",
        lastName: "Vilhuber",
        party: "Cornell University",
      },
    ],
  },
];

export const AboutPage = () => {
  const tagManagerArgs = {
    dataLayerName: "AboutPage",
  };
  useProtected();
  TagManager.dataLayer(tagManagerArgs);
  return (
    <BasePage>
      <div className="max-w-[719px]">
        <TextHeader>About</TextHeader>
        <TextSubHeader className="mt-7">Research</TextSubHeader>
        <Text className="mt-4">
          This tool is a prototype validation server that we envision could be
          adopted by government agencies individually and as part of a future{" "}
          <a
            href="https://ncses.nsf.gov/about/national-secure-data-service-demo"
            target="_blank"
            className="text-primary"
          >
            National Secure Data Service (NSDS)
          </a>
          . A validation server is a tool that allows researchers and policy
          analysts to submit and run statistical analyses on confidential data
          and receive privacy preserving outputs from those analyses. This
          innovation is crucial to expanding the ability of government agencies
          to better understand the impact of current and potential policies and
          craft better ones based on the evidence.
          <br className="mb-1" />
          <br className="mb-1" />
          In this prototype phase, the validation server is being made available
          with publicly available CPS data (specifically, combined data from the
          2022 and 2023 Annual Social and Economic Supplement) standing in for
          confidential data to enable testing and improvement of the tool in the
          public sphere. We hope that this enables us to continue to improve the
          tool, identifying areas where security and utility can be improved to
          the point that the system could be adopted for use with secure
          government confidential data.
          <br className="mb-1" />
          <br className="mb-1" />
          Before the end of 2024, the Urban Institute plans to release
          documentation and a white paper describing the methodology and system
          architecture behind the tool.
          <br className="mb-1" />
          <br className="mb-1" />
          To provide feedback on the tool or to learn more about the validation
          server or the Urban Institute's{" "}
          <a
            href="https://www.urban.org/projects/safe-data-technologies"
            target="_blank"
            className="text-primary"
          >
            Safe Data Technology
          </a>{" "}
          initiative, please contact{" "}
          <a href="mailto:safedatatech@urban.org" className="text-primary">
            safedatatech@urban.org
          </a>
          .
        </Text>
        <TextSubHeader className="mt-7">Project Credit</TextSubHeader>
        <Text className="mt-4 italic">
          This feature was funded by the{" "}
          <a
            href="https://ncses.nsf.gov/"
            target="_blank"
            className="text-primary"
          >
            National Science Foundation National Center for Science and
            Engineering Statistics
          </a>{" "}
          (NCSES). Original funding and support for the initial research and
          version 1 prototype was provided by the{" "}
          <a href="https://sloan.org/" target="_blank" className="text-primary">
            Alfred P. Sloan Foundation
          </a>
          ,{" "}
          <a
            href="https://www.arnoldventures.org/"
            target="_blank"
            className="text-primary"
          >
            Arnold Ventures
          </a>
          , the{" "}
          <a
            href="https://blogs.microsoft.com/on-the-issues/2020/12/10/differential-privacy-smartnoise-early-adopter-acceleration-program/"
            target="_blank"
            className="text-primary"
          >
            Microsoft SmartNoise Early Adopter Accelerator Program
          </a>
          , and NCSES. We are grateful to all our funders, who make it possible
          for Urban to advance its mission. We are also thankful to our
          dedicated partners at the{" "}
          <a
            href="https://www.irs.gov/statistics/soi-tax-stats-statistics-of-income"
            target="_blank"
            className="text-primary"
          >
            IRS Statistics of Income Division
          </a>
          . The views expressed are those of the authors and should not be
          attributed to the Urban Institute, its trustees, its partners, or its
          funders. Funders do not determine research findings or the insights
          and recommendations of our experts. More information on our funding
          principles is available{" "}
          <a
            href="https://www.urban.org/support/funding-principles"
            target="_blank"
            className="text-primary"
          >
            here
          </a>
          . Read our terms of service{" "}
          <a
            href="https://www.urban.org/terms-service"
            target="_blank"
            className="text-primary"
          >
            here
          </a>
          .
          <br className="mb-1" />
          This data tool is a product of Urban Institute's{" "}
          <a
            href="https://www.urban.org/projects/safe-data-technologies"
            target="_blank"
            className="text-primary"
          >
            Safe Data Technologies
          </a>{" "}
          initiative.
        </Text>
        {projectCredit.map((credit, index) => (
          <div key={index} className="mt-4">
            <span className="font-bold uppercase">{credit.name}</span>
            {credit.contributors.map((contributor, index) => (
              <span key={index}>
                {" "}
                <span>
                  {contributor.href ? (
                    <Link href={contributor.href ?? "#"}>
                      {`${contributor.firstName} ${contributor.lastName}${
                        contributor.party ? ` (${contributor.party})` : ""
                      }`}
                    </Link>
                  ) : (
                    `${contributor.firstName} ${contributor.lastName}${
                      contributor.party ? ` (${contributor.party})` : ""
                    }`
                  )}
                </span>
                {credit.contributors.length > 1 &&
                  index <= credit.contributors.length - 2 && (
                    <span>{`, `}</span>
                  )}
                {credit.contributors.length > 1 &&
                  index === credit.contributors.length - 2 && (
                    <span>{`and `}</span>
                  )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </BasePage>
  );
};
