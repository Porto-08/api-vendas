import handlebars from "handlebars";
import { IParseMailTemplate } from "src/interfaces";
import fs from "fs";

export class handlebarsMailTemplate {
    public async parse({ file, variables }: IParseMailTemplate): Promise<string> {

        const templateFileContent = await fs.promises.readFile(file, {
            encoding: "utf-8",
        });

        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);
    }
}