function reverseStr(str){
    var listOfChars = str.split('');//to split the word
    // console.log("listOfChars",listOfChars)
     var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
}

function isPalindrome(str){
    var reverse = reverseStr(str);
     return str === reverse;//is the pelindrome is true or not
    
    

}
function convertDateToString(date){
    var dateStr = {day: "",month:'',year:""};
    if(date.day < 10){
        dateStr.day = "0" + date.day

    } 
    else{
        dateStr.day = date.day.toString();
    }

    if(date.month < 10){
        dateStr.month = "0" + date.month;

    } 
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
    
}
function getAllDateFormats(date){
    var dateStr = convertDateToString(date);

     var ddmmyyyy =dateStr.day + dateStr.month + dateStr.year
     var mmddyyyy = dateStr.month + dateStr.day + dateStr.year
     var yyyymmdd = dateStr.year + dateStr.month + dateStr.day
     var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
     var mmddyy =dateStr.day + dateStr.month + dateStr.year.slice(-2);
     var yyyymmdd =dateStr.year.slice(-2) + dateStr.month + dateStr.day;

     return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyyymmdd];
}

function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);


    var flag = false;
     
    for(var i = 0; i<listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i]) ){
           flag = true;
           break;
        }
    }
    return flag;
}    

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
}
return false;
}
//incresinng the days
function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;


    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        // checking is it a leap yeap year or not
        if(isLeapYear(year)){
            if( day> 29){//for the month feb
                day =1;
                month++;
            }
        }
        else{
            if(day > 28){
                day =1;
                month++;

            }
        }

    }
    //days increased
    else{
        if(day > daysInMonth[month -1]){
            day =1;
            month++;

        }
    }
    if(month >12){
        month = 1;
        year++;
    }

    return{
        day: day,
        month: month,
        year: year
    };

    }


function getNextPalindromeData(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate]

}


// function getPreviousDate(date){
//     var day = date.day - 1;
//     var month = date.month;
//     var year = date.year;


//     var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//     if(month === 2){
//         // checking is it a leap yeap year or not
//         if(isLeapYear(year)){
//             if( day> 29){//for the month feb
//                 day =1;
//                 month--;
//             }
//         }
//         else{
//             if(day > 28){
//                 day =1;
//                 month--;

//             }
//         }

//     }
//     //days increased
//     else{
//         if(day > daysInMonth[month -1]){
//             day =1;
//             month--;

//         }
//     }
//     if(month >12){
//         month = 1;
//         year++;
//     }

//     return{
//         day: day,
//         month: month,
//         year: year
//     };

//     }


function getNextPalindromeData(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate]

}

var date ={
    day:12,
    month: 2,
    year:2021, 
};

 console.log(getNextPalindromeData(date));




 var dateInputRef = document.querySelector("#bday-input");
var showBtnRef = document.querySelector("#show-btn");
var resultRef = document.querySelector('#result');

function clickHandeler(){
   var bdayStr = dateInputRef.value;

   if(bdayStr !== ""){
       var listOfDate = bdayStr.split("-");
       var date = {
           day:Number(listOfDate[2]),
           month: Number(listOfDate[1]),
           year: Number(listOfDate[0])
       };
      

       var isPalindrome = checkPalindromeForAllDateFormats(date);
       if(isPalindrome){
           resultRef.innerText = "Congrats, you were born in a  palindrome date do share with your friends"
       }
       else{
           var [ctr, nextDate] = getNextPalindromeData(date);
           resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days`
       }

   }
}
showBtnRef.addEventListener("click",clickHandeler)

