import React, { useState, useEffect } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';

export function fetchYamlData() {
  return axios.get('https://raw.githubusercontent.com/tuva-health/the_tuva_project/main/integration_tests/docs_generate/models/_models.yml')
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      return null;
    });
}

function parseYamlData(yamlData) {
  const models = yaml.load(yamlData);
  console.log('Parsed models:', models);

  const modelArr = models['models'].find( m => m.name === 'eligibility')['columns'];
  console.log('Is Array:', Array.isArray(modelArr));

  const parsedData = modelArr.map(model => ({
        name: model.name,
        description: model.description
      }));

  console.log('Parsed data:', parsedData);
  return parsedData;
}


export function YamlTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const yamlData = await fetchYamlData();
      console.log('YAML data:', yamlData);
      const parsedData = parseYamlData(yamlData);
      console.log('Final data:', parsedData);
      setData(parsedData);
    }

    getData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.description}</td>
            <td>{row.tags}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
