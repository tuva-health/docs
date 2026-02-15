import React, { useEffect, useState } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { DEFAULT_BRANCH, fetchModelDefinition } from './fetchModelColumns';

const DEFAULT_YAML_PATH = 'models/core/core_models.yml';

async function loadModelDescription(modelName, yamlPath, branch) {
  const { modelDescription } = await fetchModelDefinition({
    modelName,
    yamlPath,
    branch: branch || DEFAULT_BRANCH,
  });
  return modelDescription;
}

export function TableDescription({
  modelName,
  yamlPath = DEFAULT_YAML_PATH,
  branch = DEFAULT_BRANCH,
}) {
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return undefined;
    }

    let isMounted = true;

    loadModelDescription(modelName, yamlPath, branch)
      .then((text) => {
        if (isMounted) {
          setDescription(text);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [modelName, yamlPath, branch]);

  if (error) {
    return <p role="alert">Unable to load description: {error}</p>;
  }

  return description ? <p>{description}</p> : null;
}

export default TableDescription;
