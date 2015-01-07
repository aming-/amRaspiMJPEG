<!DOCTYPE html>
<html>
  <head>
    <title>RPi Cam Download</title>
  </head>
  <body>
    <p><a href="index.html">Back</a></p>
    <?php
      if(isset($_GET["delete"])) {
        unlink("media/" . $_GET["delete"]);
      }
      if(isset($_GET["delete_all"])) {
        $files = scandir("media");
        foreach($files as $file) unlink("media/$file");
      }
      else if(isset($_GET["file"])) {
        echo "<h1>" . $_GET["file"] . "</h1>";
        
        echo "<p><input type='button' value='Download' onclick='window.open(\"download.php?file=" . $_GET["file"] . "\", \"_blank\");'> ";
        echo "<input type='button' value='Delete' onclick='window.location=\"ampreview.php?delete=" . $_GET["file"] . "\";'></p>";
      }
    ?>
    <h1>Files</h1>
    <?php
        $tfsz = 0;
      $files = scandir("media");
      if(count($files) == 2) echo "<p>No videos/images saved</p>";
      else {
        foreach($files as $file) {
          if(($file != '.') && ($file != '..')) {
            $fsz = round ((filesize("media/" . $file)) / (1024 * 1024));
	     $tfsz = $tfsz + $fsz;
            echo "<p><a href='ampreview.php?file=$file'>$file</a> ($fsz MB)</p>";
          }
        }
	  echo "<p>Total size: ($tfsz MB)</p>"; 
        echo "<p><input type='button' value='Delete all' onclick='if(confirm(\"Delete all?\")) {window.location=\"ampreview.php?delete_all\";}'></p>";
      }
    ?>
  </body>
</html>
