const url = 'http://127.0.0.1:8080/list'

window.onload = () => {
    getAllExpenses()
}

function getAllExpenses(){
    document.getElementById('printData').innerHTML=''

    fetch(url,{
    method: "GET" 
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        printData(data)  
        graphData(data)     
        
    })
    .catch(error => {
        console.log("Error in GET function", error);
    })
}

let allMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function printData(d){
    let data = d;
    console.log("Passed", data);

    for(let k=0; k<data.length; k++){
        let expMon = document.createElement('div')
        expMon.setAttribute('class', 'expMonth')

        let monthDisp = document.createElement('h2')
        monthDisp.setAttribute('class', 'month-disp')
        monthDisp.innerHTML = allMonths[data[k].Month -1]+' '+data[k].Year+': &nbsp &nbsp &nbsp $'+(data[k].MonthlyAmount).toFixed(2)

        let editButtonPerMonth = document.createElement('button')
        editButtonPerMonth.setAttribute('class', 'editBtnPerMonth')
        editButtonPerMonth.setAttribute('onclick', 'editMonthDiv(event)')
        editButtonPerMonth.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>'

        expMon.appendChild(editButtonPerMonth)
        expMon.appendChild(monthDisp)

        let eachMonth = data[k].MonthData
        // console.log("EM", eachMonth);
        
        for(let i=0; i<eachMonth.length; i++){

            let expRow = document.createElement('div')
            expRow.setAttribute('class', 'expense-row')
            
            let headerRow = document.createElement('div')
            headerRow.setAttribute('class', 'headerRow')

            let headerDate = document.createElement('h3')
            headerDate.innerHTML = allMonths[(eachMonth[i].Date).split('-')[1]-1]+' '+(eachMonth[i].Date).split('-')[2]

            let sum = document.createElement('h3')
            sum.innerHTML = '$'+(eachMonth[i].DailyAmount).toFixed(2)

            headerRow.appendChild(headerDate)
            headerRow.appendChild(sum)

            expRow.appendChild(headerRow)

            let eachRow = eachMonth[i].Data

            let outData = document.createElement('div')
            outData.setAttribute('class', 'outData')
            
            for(let j=0; j<eachRow.length; j++){
                
                let inData = document.createElement('div')
                inData.setAttribute('class', 'inData')
                inData.setAttribute('id', eachRow[j].id)

                let dispTitle = document.createElement('p')
                dispTitle.innerHTML = eachRow[j].Title

                let dispAmount = document.createElement('p')
                dispAmount.innerHTML = '$'+(eachRow[j].Amount).toFixed(2)

                inData.appendChild(dispTitle)
                inData.appendChild(dispAmount)

                outData.appendChild(inData)
            }

            expRow.appendChild(outData)

            expMon.appendChild(expRow)
        }

        document.getElementById('printData').appendChild(expMon)
        
    } 
}


function addExp(){
   
    let newExp = document.getElementById('myForm') 

    let val={}
     let formData = new FormData(newExp)
     formData.forEach((value, key) => {
        val[key] = value
    });
    
    let data = {
        "title": val.title,
        "amount": val.amount,
        "date" : val.date
    }
    // console.log(data);

    fetch(url,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data =>{
        // console.log(data);
        document.querySelector('.formArea').style.display = 'none'
        newExp.reset()
        getAllExpenses()
    })
    .catch(error => {
        console.error("POST Error", error)
    });
}



function openForm(){
    document.querySelector('.formArea').style.display = 'flex'
}
function closeForm(){
    document.querySelector('.formArea').style.display = 'none'
}

let t

function editMonthDiv(event){
    t = event.currentTarget
    let entriesAll = t.parentNode.querySelectorAll('.expense-row'),i

    if(t.innerHTML == '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>'){
        t.innerHTML = '<svg stroke="currentColor" fill="red" stroke-width="0" viewBox="0 0 16 16" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.354 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"></path><path d="M6.25 8.043l-.896-.897a.5.5 0 10-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 00.708 0l7-7a.5.5 0 00-.708-.708L8.5 10.293l-.543-.543-.707.707z"></path></svg>'
        // console.log(entriesAll);
    
        for(i=0; i<entriesAll.length; i++){
            let allInData = entriesAll[i].querySelectorAll('.inData'),j

            for(j=0;j<allInData.length;j++){
                let twoBtns = document.createElement('div')
                twoBtns.setAttribute('class', 'twoBtns')
                let btnEdit = document.createElement('button')
                btnEdit.setAttribute('class', 'btnEdit')
                btnEdit.setAttribute('onclick', 'editThis(this)')
                btnEdit.innerHTML = 'E'
                let btnDel = document.createElement('button')
                btnDel.setAttribute('class', 'btnDel')
                btnDel.setAttribute('onclick', 'deleteThis(event)')
                btnDel.innerHTML = 'D'

                twoBtns.appendChild(btnEdit)
                twoBtns.appendChild(btnDel)

                allInData[j].appendChild(twoBtns)
            }
        }
    }
    else if(t.innerHTML == '<svg stroke="currentColor" fill="red" stroke-width="0" viewBox="0 0 16 16" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.354 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"></path><path d="M6.25 8.043l-.896-.897a.5.5 0 10-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 00.708 0l7-7a.5.5 0 00-.708-.708L8.5 10.293l-.543-.543-.707.707z"></path></svg>'){
        t.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>'
        
        for(i=0; i<entriesAll.length; i++){
            let allInData = entriesAll[i].querySelectorAll('.inData'),j

            for(j=0;j<allInData.length;j++){
                let bothBtns = allInData[j].querySelector('.twoBtns')
               allInData[j].removeChild(bothBtns)
            }
        }
    }

}



function editThis(s){
    let selNode = s.parentNode.parentNode;
    let id = parseInt(s.parentNode.parentNode.id);
    console.log(id);

    let selTitle = selNode.children[0].innerHTML
    let selAmount= parseFloat((selNode.children[1].innerHTML).substring(1))

    document.getElementById('f2-id').value = id
    document.getElementById('f2-title').value = selTitle
    document.getElementById('f2-amt').value = selAmount

    document.querySelector('.formArea2').style.display='flex'

    
}

function deleteThis(event){
    let id = event.currentTarget.parentNode.parentNode.id;
    console.log(id);

    let conf = confirm('Do you want to delete id:'+id+'?')

    if(conf){
        fetch(url+'/'+id,{
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data =>{
            console.log('DELETED',data);
            getAllExpenses()

        })
        .catch(error => {
            console.error("DELETE Error", error)
        });
    }else{
        console.log('not deleted');
    }
}


function closeForm2(){
    document.querySelector('.formArea2').style.display = 'none'
    document.getElementById('myForm2').reset()
}


function editSubmit() {
    let newExp = document.getElementById('myForm2') 

    let val={}
     let formData = new FormData(newExp)
     formData.forEach((value, key) => {
        val[key] = value
    });

    console.log(val);

    let id = parseInt(val.id)
    
    let data = {
        "title": val.title,
        "amount": parseFloat(val.amount)
    }
    console.log(data);

    fetch(url+'/'+id,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data =>{
        console.log("UPDATED", data);
        closeForm2()
        getAllExpenses()
    })
    .catch(error => {
        console.log("UPDATE ERROR", error);
    })
}


function graphData(data){

    let defMon = data

    document.getElementById('selMonth').innerHTML=''
    for(let j=0; j<defMon.length; j++){
        let op = document.createElement('option')
        let month = (defMon[j].Month).toString().padStart(2,'0')
        op.setAttribute('value',defMon[j].Year+'-'+month    )
        op.innerHTML = allMonths[month-1]+' '+defMon[j].Year
        
        document.getElementById('selMonth').appendChild(op)
    }

    let d = data[0].MonthData
    console.log("Graph", d);

    let xy = {}

    d.forEach(item => {
          xy[item.Date] = parseFloat(item.DailyAmount.toFixed(2))
      });

    console.log("xy", xy);

    let xyVal = {}

    const keys = Object.keys(xy).reverse();
    keys.forEach(key => {
        xyVal[key] = xy[key];
      });
    
      console.log("xyVal", xyVal);
        
        new Chart("myChart", {
          type: "line",
          data: {
            labels: Object.keys(xyVal),
            datasets: [{
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(0,0,255,1.0)",
              borderColor: "rgba(0,0,255,0.1)",
              data: Object.values(xyVal)
            }]
          },
          options: {
            legend: {display: false},
            scales: {
            //   yAxes: [{ticks: {min: 0, max:}}],
            }
          }
        });
}


function changeView(id){
    console.log(id);

    let both = document.querySelectorAll('.btnViews'),i;
    for(i=0;i<both.length;i++){
        both[i].classList.remove('active')
    }

    document.getElementById(id).classList.add('active')

    if(id == 'graphView'){
        document.getElementById('printData').style.display = 'none'
        document.getElementById('graph-container').style.display = 'flex'
    }
    else if(id == 'listView'){
        document.getElementById('printData').style.display = 'block'
        document.getElementById('graph-container').style.display = 'none'
    }
}


function helloman(){
    console.log(document.getElementById('selMonth').value);
    k = document.getElementById('selMonth').value
    // getAllExpenses()

    fetch('http://127.0.0.1:8080/graph/'+k,{
        method: "GET" 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            let xy={}
            data.forEach(item => {
                xy[item.Date] = item.DailySum.toFixed(2)
            });
      
          console.log("xyNow", xy);
      
        
              new Chart("myChart", {
                type: "line",
                data: {
                  labels: Object.keys(xy),
                  datasets: [{
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: Object.values(xy)
                  }]
                },
                options: {
                  legend: {display: false},
                  scales: {
                       
                    }
                }
              });
            
        })
        .catch(error => {
            console.log("Error in GET function", error);
        })
}