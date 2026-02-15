import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { DEFAULT_BRANCH, fetchYamlFile } from './fetchModelColumns';

const DEFAULT_YAML_PATH = 'models/core/core_models.yml';
const YAML_LOAD_OPTIONS = { json: true };

async function loadModelDescription(modelName, yamlPath, branch) {
  const { text } = await fetchYamlFile(yamlPath, branch || DEFAULT_BRANCH);
  const parsed = yaml.load(text, YAML_LOAD_OPTIONS);
  const model = parsed?.models?.find((entry) => entry.name === modelName);

  if (!model) {
    throw new Error(`Model "${modelName}" not found in ${yamlPath}`);
  }

  return (model.description || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ');
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
