import { BasePage } from "@/components";
import { Text, TextHeader, TextSubHeader } from "@/components/Text";
import { useProtected } from "@/hooks/useProtected";
import TagManager from "react-gtm-module";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const HelpPage = () => {
  const tagManagerArgs = {
    dataLayerName: "HelpPage",
  };
  useProtected();
  TagManager.dataLayer(tagManagerArgs);

  const codeString1 = `
  library(dplyr)

  run_analysis <- function(conf_data) {
      # Arbitrary code -----------------------------------------------------------
      transformed_df <- conf_data %>% 
          mutate(agi_above_30k = case_when(ADJGINC > 30000 ~ 1, 
                                           TRUE ~ 0))
      
      # Specify analyses -----------------------------------------------------------
      # Example linear model 
      lm_fit <- lm(ADJGINC ~ AGE, data = transformed_df)
      lm_example <- get_model_output(
          fit = lm_fit, 
          model_name = "Example Linear Model"
      )
      
      # Example binomial model 
      glm_fit <- glm(agi_above_30k ~ AGE, family = binomial, data = transformed_df)
      glm_example <- get_model_output(
          fit = glm_fit, 
          model_name = "Example Binomial Model"
      )
      
      # Submit analyses ------------------------------------------------------------
      submit_output(lm_example, glm_example)
  }`;

  const codeString2 = `
  library(dplyr)

  run_analysis <- function(conf_data) {
      # Arbitrary code -----------------------------------------------------------
      transformed_df <- conf_data %>%
          filter(AGE >= 18, AGE <= 65) %>% 
          mutate(earned_income = INCWAGE + INCBUS + INCFARM) %>% 
          mutate(MARST = as.factor(MARST), 
                 SEX = as.factor(SEX))
      
      # Specify analyses -----------------------------------------------------------
      # Example summary statistic  
      table1 <- get_table_output(
          data = transformed_df,
          table_name = "Example Table 1",
          stat = "mean",
          var = "earned_income"
      )
      
      # Example table with multiple stat/var/by values 
      table2 <- get_table_output(
          data = transformed_df,
          table_name = "Example Table 2",
          stat = c("mean", "sd"),
          var = c("earned_income", "ADJGINC"), 
          by = c("MARST", "SEX")
      )
      
      # Submit analyses ------------------------------------------------------------
      submit_output(table1, table2)
  }`;

  return (
    <BasePage>
      <div className="max-w-[719px]">
        <TextHeader>Help</TextHeader>
        <TextSubHeader className="mt-7">DATA</TextSubHeader>
        <Text className="mt-4">
          Currently, all uploaded R scripts will be run against combined data
          from the 2022 and 2023 Annual Social and Economic Supplement
          (CPS-ASEC) standing in for confidential data. This data extract was
          downloaded from{" "}
          <a
            href="https://cps.ipums.org/cps/index.shtml"
            target="_blank"
            className="text-primary"
          >
            IPUMS CPS
          </a>{" "}
          and includes all available income, tax, and
          demographic variables for the 2022 and 2023 ASEC samples.
          <br className="mb-1" />
          <br className="mb-1" />
          You can
          download a copy of the extract as a CSV file from{" "}
          <a
            href="https://sdt-validation-server-public-access.s3.amazonaws.com/data/cps_2022-2023.csv"
            target="_blank"
            className="text-primary"
          >
            here
          </a>{" "}
          and a copy of the codebook from{" "}
          <a
            href="https://sdt-validation-server-public-access.s3.amazonaws.com/codebooks/cps_2022-2023_codebook.txt"
            target="_blank"
            className="text-primary"
          >
            here
          </a>
          . Please see the{" "}
          IPUMS documentation for detailed information on the{" "}
          <a
            href="https://cps.ipums.org/cps-action/variables/group?id=asec_inc"
            target="_blank"
            className="text-primary"
          >
            income
          </a>
          ,{" "}
          <a
            href="https://cps.ipums.org/cps-action/variables/group?id=asec_tax"
            target="_blank"
            className="text-primary"
          >
            tax
          </a>
          , and{" "}
          <a
            href="https://cps.ipums.org/cps-action/variables/group/core_demographic"
            target="_blank"
            className="text-primary"
          >
            demographic{" "}
          </a>
          variables, along with links to the{" "}
          <a
            href="https://cps.ipums.org/cps/codebooks.shtml#asec_codebooks"
            target="_blank"
            className="text-primary"
          >
            original ASEC codebooks.
          </a>
        </Text>
        <TextSubHeader className="mt-7">R PACKAGE</TextSubHeader>
        <Text className="mt-4">
          To upload an R script, you must use the{" "}
          <a
            href="https://github.com/UrbanInstitute/mos-validation-server-r-package"
            target="_blank"
            className="text-primary"
          >
            validationserver R package
          </a>{" "}
          to define tablular and/or regression analyses. Please see the{" "}
          <a
            href="https://github.com/UrbanInstitute/mos-validation-server-r-package"
            target="_blank"
            className="text-primary"
          >
            package documentation
          </a>{" "}
          for detailed information on how to use the package and examples
          demonstrating how to define analyses.
          <br className="mb-1" />
          <br className="mb-1" />
          The following example script defines regressions using the get_model_output()
          function:
          <SyntaxHighlighter language="r" style={docco}>
            {codeString1}
          </SyntaxHighlighter>
          <br className="mb-1" />
          The following example script defines summary tables using the
          get_table_output() function:
          <SyntaxHighlighter language="r" style={docco}>
            {codeString2}
          </SyntaxHighlighter>
        </Text>
      </div>
    </BasePage>
  );
};
