const reactDocs = require('react-docgen');
const fs = require('fs');
const path = require('path');

const componentInfo = reactDocs.parse(fs.readFileSync(path.join(__dirname, '../src/BottomSheet/index.js')).toString());

let readmeProps = `| Property | Type | Default | Description |
| --- | --- | --- | --- |`;

for(const propertyName in componentInfo.props) {
  const propInfo = componentInfo.props[propertyName];
  const propertyType = propInfo.type.name;
  const propertyDefault = propInfo.defaultValue ? propInfo.defaultValue.value : '';
  const propertyDescription = propInfo.description;

  readmeProps += `
| ${propertyName} | ${propertyType} | ${propertyDefault} | ${propertyDescription.replace('|', ':').replace('\n', '')} |`;
}

const actualReadme = fs.readFileSync(path.join(__dirname, '../README.md')).toString();
const pieces = actualReadme.split('Contributing');

fs.writeFileSync(path.join(__dirname, '../README.md'), 
`${pieces[0]}

${readmeProps}

Contributing${pieces[1]}`);