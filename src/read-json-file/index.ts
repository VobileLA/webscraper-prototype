import fs from "fs";

(async()=> {
    const inputData = JSON.parse(fs.readFileSync('/Users/vobile/Documents/webscraper_prototyp_factorymethod/data/file.json', 'utf-8'));
    // console.log(inputData);
    const results = [];

    //loop through the queries
    for (const query of inputData.queries) {
        const flowType = JSON.stringify(query.flow_type);
        // console.log(flowType);
        const id = JSON.stringify(query.work.id);
        // console.log(id);
        const movieName = JSON.stringify(query.work.label);
        // console.log(movieName);
        const type = JSON.stringify(query.work.type);
        // console.log(type);
        results.push({
            flow_type: flowType,
            work: {
                id: id,
                type: type,
                label: movieName}
            });
    }
    console.log(results);

    const jsonString = JSON.stringify(results, null , 2);
    const cleanedJsonString = jsonString.replace(/\\"/g, '');
    fs.writeFileSync('/Users/vobile/Documents/webscraper_prototyp_factorymethod/src/read-json-file/output.json', cleanedJsonString, 'utf-8');

})()
