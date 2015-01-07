
//
// Shutdown
//
function sys_shutdown() {
  ajax_status.open("GET", "cmd_func.php?cmd=shutdown", true);
  ajax_status.send();
}

function sys_reboot() {
  ajax_status.open("GET", "cmd_func.php?cmd=reboot", true);
  ajax_status.send();
}

//
// MJPEG
//
var mjpeg_img;
var halted = 0;

function reload_img () {
  if(!halted) mjpeg_img.src = "cam_pic.php?time=" + new Date().getTime();
  else setTimeout("reload_img()", 500);
}

function error_img () {
  setTimeout("mjpeg_img.src = 'cam_pic.php?time=' + new Date().getTime();", 100);
}

//
// Ajax Status
//
var ajax_status;

if(window.XMLHttpRequest) {
  ajax_status = new XMLHttpRequest();
}
else {
  ajax_status = new ActiveXObject("Microsoft.XMLHTTP");
}


ajax_status.onreadystatechange = function() {
  if(ajax_status.readyState == 4 && ajax_status.status == 200) {

    if(ajax_status.responseText == "ready") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "ready";
      document.getElementById("video_button").onclick = function() {send_cmd("ca 1");};
      halted = 0;
    }
    else if(ajax_status.responseText == "md_ready") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "md_ready";
      document.getElementById("video_button").onclick = function() {};
      halted = 0;
    }
    else if(ajax_status.responseText == "video_rec") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "video_rec";
      document.getElementById("video_button").onclick = function() {send_cmd("ca 0");};
    }
    else if(ajax_status.responseText == "timelapse") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "record video start";
      document.getElementById("video_button").onclick = function() {};
   }
    else if(ajax_status.responseText == "md_video_rec") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "md_video_rec";
      document.getElementById("video_button").onclick = function() {};
    }
    else if(ajax_status.responseText == "image") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "record video start";
      document.getElementById("video_button").onclick = function() {};
    }
    else if(ajax_status.responseText == "boxing") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "video processing...";
      document.getElementById("video_button").onclick = function() {};
    }
    else if(ajax_status.responseText == "md_boxing") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "record video start";
      document.getElementById("video_button").onclick = function() {};
    }
    else if(ajax_status.responseText == "halted") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "record video start";
      document.getElementById("video_button").onclick = function() {};
      halted = 1;
    }
    else if(ajax_status.responseText.substr(0,5) == "Error") alert("Error in RaspiMJPEG: " + ajax_status.responseText.substr(7) + "\nRestart RaspiMJPEG (./RPi_Cam_Web_Interface_Installer.sh start) or the whole RPi.");
    
    reload_ajax(ajax_status.responseText);

  }
}

function reload_ajax (last) {
  ajax_status.open("GET","status_mjpeg.php?last=" + last,true);
  ajax_status.send();
}


//
// Ajax Commands
//
var ajax_cmd;

if(window.XMLHttpRequest) {
  ajax_cmd = new XMLHttpRequest();
}
else {
  ajax_cmd = new ActiveXObject("Microsoft.XMLHTTP");
}

function send_cmd (cmd) {
  ajax_cmd.open("GET","cmd_pipe.php?cmd=" + cmd,true);
  ajax_cmd.send();
}

//
// Init
//
function init() {

  // mjpeg
  mjpeg_img = document.getElementById("mjpeg_dest");
  mjpeg_img.onload = reload_img;
  mjpeg_img.onerror = error_img;
  reload_img();
  // status
  reload_ajax("");

}
