var hrbreak;
var minbreak;
var secbreak;
var p;
var q;
var r;
var s;
var t;
var u;

    setInterval(updateCountdown,1000);
    let bgpage=chrome.extension.getBackgroundPage();
    function updateCountdown()
{
   
   
     hrbreak=bgpage.hourspop;
     minbreak=bgpage.minutespop;
     secbreak=bgpage.secondspop;
     console.log(hrbreak);
     console.log(minbreak);
     console.log(secbreak);
     
    
}
document.getElementById("blockset").onclick = function() {
    p=document.getElementById("blockhrs").value;
    q=document.getElementById("blockmins").value;
  r=document.getElementById("blocksecs").value;
  s=document.getElementById("finalblockhrs").value;
  t=document.getElementById("finalblockmins").value;
u=document.getElementById("finalblocksecs").value;

  console.log(p);
  console.log(q);
  console.log(r);
  console.log(s);
  console.log(t);
  console.log(u);

    chrome.runtime.sendMessage({  //send a message to the background script
      from: "breaktimer",
    
      
      firstelt: p,
      secondelt:q ,
      thirdelt: r,
      fourthelt:s,
      fifthelt:t,
      sixthelt:u

      // fourthelt:hrbreak,
      // fifthelt:minbreak,
      // sixthelt:secbreak
  
    });
    alert("Time for Break is Saved ");
  }
