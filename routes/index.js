const { default: axios } = require('axios');
const { query } = require('express');

const router = require('express').Router()

router.get('/', async (req, res)=>{
    let tbls = await getData({});
    res.render('index', {...tbls}) 

});

router.post('/', async (req, res)=>{
    let tbls = await getData({...req.body});
    res.render('index', {...tbls}) 
});

const getData = async (args) => {
    console.log('args :>> ', args);

    let body = {}, response = {}

    if(args.hasOwnProperty('hid') && args.hid.length !== 0){
        body = {
            query:`mutation ($regno: String!, $hid: Int!, $mark:Float!){
                    updatemarks(regno: $regno, hid: $hid, mark: $mark){
                  _id mid regno hid marks
                }}`,
            variables:{ 
                regno: args.regno, 
                hid: Number(args.hid),
                mark: Number(args.mark) 
            }
        } 

        let result = await axios.post("http://localhost:4200/graphql", body);
        //response = {...response, ...student.data.data}
    }

    body = {
        query: ` query{ 
                    students { regno name marks{ marks } } 
                    heads { hid headname total } 
                    grades { gradeid start end grade gpa }              
                }`
    }
    let recap  = await axios.post("http://localhost:4200/graphql", body)
    response = {...response, ...recap.data.data}
    
    if(args.regno != null){

          body = {
            query:`query($regno: String!) {
                student(regno: $regno) { regno name marks { hid marks head{ headname total }}}
            }`,
            variables:{ regno: args.regno }
        } 
        let student = await axios.post("http://localhost:4200/graphql", body);
        response = {...response, ...student.data.data}
    }

    response = {...response, ...args}

    //console.log(response);

    return response;
}

module.exports = router;