import { ParsingTool } from './../types/parsing-tool';

export const filterParsingTools = (tools: ParsingTool[], filterTab: string) => {
  switch (filterTab) {
    case 'all':
      return tools;
    case 'current':
      return tools.filter((tool) => tool.isCurrent === true);
    case 'favorite':
      return tools.filter((tool) => tool.isFavorite === true);
    default:
      return tools;
  }
};
