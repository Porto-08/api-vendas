import handlebars from "handlebars";
import { IParseMailTemplate } from "src/interfaces";



export class handlebarsMailTemplate {
    public async parse({ template, variables }: IParseMailTemplate): Promise<string> {

        const parseTemplate = handlebars.compile(template);

        return parseTemplate(variables);
    }
}