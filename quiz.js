const ques=[
    {que:"What is the difference between XML and HTML?",option:["HTML is used for exchanging data, XML is not.","XML is used for exchanging data, HTML is not.","HTML can have user defined tags, XML cannot"],crt:1},
{que:"HTML program is saved using _________ extension.",option:[".html",".hml",".htm",".htlm"],crt:0},
{que:"HTML documents are saved in?",option:["ASCII text ","Machine language codes","Special Binary format"," None of these"],crt:0},
{que:"<meta> tag cannot be defined in the <head> tag.",option:["True","False"],crt:0},
{que:"If background image is smaller than the screen, what will happen?",option:["It’ll be stretched","It’ll be repeated","It’ll leave blank space at the bottom of page","None of these"],crt:1},
{que:"How do you define multiple transition in css?",option:["transition: width 1s, height 2s","transition: width  height, 1s 2s","transition: width 1s/ height 2s","transition: width, 1s, height, 2s"],crt:0},
{que:"What are the first three values of text-shadow in order?",option:["vertical, blur, horizontal","blur, vertical, horizontal","vertical, horizontal, blur","horizontal, vertical, blur"],crt:3},
{que:"How to you modify a border image using CSS3?.",option:["border: url(image.png);","border-variable: image url(image.png);","border-image: url(border.png) 30 30 round;"],crt:2},
{que:"What is css Float?",option:["allows other elements to wrap around an element"," element can be pushed to the left or right","both a and b above","element can be pushed to any direction"],crt:2},
{que:"If you put a value of 0 for a Border-Radius what will happen?.",option:["The Corner will curve horizontal.","The Corner will be square","The Corner will curve vertical.","The world will end."],crt:1},
{que:" The _____________ selector is used to specify a style for a single, unique element",option:["id","class","test","bit"],crt:0},
{que:"JavaScript ignores extra spaces",option:["True","False"],crt:0},
{que:"Which of the following is correct to write “Hello World” on the web page?",option:["System.out.println(“Hello World”)","print(“Hello World”)","document.write(“Hello World”)","response.write(“Hello World”)"],crt:2},
{que:"Which of the following function of String object is used to match a regular expression against a string?",option:["search","replace()","concat()","match()"],crt:3},
{que:"Which of the following is used to capture all click events in a window?",option:["window.captureEvents(Event.CLICK);","window.routeEvents(Event.CLICK );","window.handleEvents (Event.CLICK);"," window.raiseEvents(Event.CLICK );"],crt:0},
{que:"What does PHP stand for?",option:["Preprocessed Hypertext Page","Hypertext Markup Language","PHP: Hypertext Preprocessor","Hypertext Transfer Protocol"],crt:2},
{que:"Why so Java and JavaScript have similar name?",option:["Java Script is a stripped-down version of Java","The syntax of JavaScript is loosely based on Java syntax", 
"They both support Object Oriented Programming","None of the above"],crt:1},
{que:"Java Script entities start with ____________ and end with ______________",option:["Semicolon, colon","Semicolon, Ampersand","Ampersand, colon ","Ampersand, semicolon"],crt:3},
{que:"How to append a value to an array of Java Script?",option:[" arr[arr.length] = value ","arr[arr.length+1] = new Arrays()","arr[arr.length-1] = value", "arr[arr.length*1] = value"],crt:0},
{que:" Jquery is a library for _______ scripting.",option:["Client ","Server","Both a and b","None of these"],crt:2}];
 let score = 0, index = 0, name = "",answer = [], times;


 $(document).ready(function(){
    $(".sec3").fadeIn();
    newQuestion()
    startTimes()
  
  $(".quiz").on("click","li", function(){
    $(".quiz .select").removeClass("select");
    $(this).addClass("select");
  })
  $(".submit").click(function(){
   const select = $(".quiz li").hasClass("select");
   if(!select) {
    alert("please select any option");
    return;
   }
   const key = $(".quiz .select").attr("data-key");
   checkAns(key)
  })
  $(".check-ans").click(function(){
    $(".sec4").fadeOut();
    $(".sec5").fadeIn();
    showYourAns()
  });
  $(".back-btn").click(function(){
    $(".sec5").fadeOut();
    $(".sec4").fadeIn();
  });
  
});

let s = 0, m = "0"+0;
function showTime(){
 s++
 if(s >= 60) {
  s = 0;
  m++
  m = m < 10 ? "0" + m : m;
 }
 s = s < 10 ? "0" + s : s;
 $(".time").text(m+":"+s);
}
function startTimes(){
  times = setInterval(showTime,1000)
}
function newQuestion(){
  const que = ques[index];
  showIndex()
  $(".question").text(que.que);
  $(".quiz").html("");
  que.option.forEach((q,i) => {
   const li = document.createElement('li');
   li.setAttribute('data-key',i);
   li.textContent = q;
   $(".quiz").append(li)
  })
}

function checkAns(key) {
 const que = ques[index];
 answer.push(key);
 if(que.crt == key) {
  score++;
  makeToast("Right")
 } else{
  makeToast("Wrong")
 }
 index++;
 if(index < ques.length) {
  newQuestion()
 } else{
  showResult()
  clearInterval(times)
 }
}

function showIndex(){
 $(".index").text(1 + index+"/"+ques.length)
}

function showResult(){
 $(".sec3").fadeOut();
 $(".sec4").fadeIn();
 $("#name").text(name);
 $(".name").text(name);
 const scores = Math.round(score / ques.length * 100);
 const grt = scores < 25 ? "Poor" : scores < 50 ? "Good" : scores < 76 ? "Very Good" : "Excellent";
 $("#score").text("Score : "+ scores +"%");
 $("#id").text("Test Id : "+ Math.ceil(Math.random() * 20000));
 
 $(".great").text(grt);
}


function showYourAns() {
 $(".ans-list").html("");
 $(".sc").text(score+ "/"+ques.length)
 ques.forEach((que,i) => {
  const li = document.createElement('li');
  const p = document.createElement('p');
  const span = document.createElement('span');
  p.textContent = 1+i +" : "+ que.que;
  const chrt = que.crt == answer[i] ? '👉' : '❌';
  span.textContent = chrt +" "+ que.option[answer[i]];
  const cls = que.crt == answer[i] ? 'green' : 'red';
  span.classList.add(cls);
  li.appendChild(p)
  li.appendChild(span)
  $(".ans-list").append(li);
 })
}

function makeToast(txt) {
 $(".toast").text(txt);
 $(".toast").fadeIn();
 setTimeout(() => $(".toast").fadeOut(),1000)
}