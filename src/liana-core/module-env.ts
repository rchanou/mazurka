import { import as fetchModule } from "systemjs";

export const pull = async (depIds: string[], current = {}) => {
  const depRequests = [];

  for (const depId of depIds) {
    if (!current[depId]) {
      const depRequest = fetchModule(depId);
      (async () => {
        current[depId] = await depRequest;
      })();
      depRequests.push(depRequest);
    }
  }

  await Promise.all(depRequests);
  return current;
};
