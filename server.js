const express = require("express");
const { exec } = require("child_process");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/scan", (req, res) => {
  const target = req.body.target;

  if (!target) {
    return res.status(400).send("Target is required");
  }

  // Run Nmap command target_host

  const command = `nmap -Pn -T4 -F ${target}`;
  // const command = `nmap -Pn -sC ${target}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Nmap: ${error}`);
      return res.status(500).send("An error occurred");
    }

    const scanResults = stdout.toString();
    res.send(scanResults);
  });
});

app.post("/traceroute", (req, res) => {
  const target = req.body.target;

  if (!target) {
    return res.status(400).send("Target is required");
  }

  // Run Nmap traceroute command
  const command = `nmap --traceroute ${target}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing traceroute: ${error}`);
      return res.status(500).send("An error occurred");
    }

    const tracerouteResults = stdout;
    res.send(tracerouteResults);
  });
});

app.post("/os-detection", (req, res) => {
  const target = req.body.target;

  if (!target) {
      return res.status(400).send("Target is required");
  }

  // Run Nmap OS detection command
  const command = `nmap -O ${target}`;
  exec(command, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error executing OS detection: ${error}`);
          return res.status(500).send("An error occurred");
      }

      const osResults = stdout;
      res.send(osResults);
  });
});

app.post("/ping-scan", (req, res) => {
  const target = req.body.target;

  if (!target) {
      return res.status(400).send("Target is required");
  }

  // Run Nmap ping scan command
  const command = `nmap -sn ${target}`;
  exec(command, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error executing ping scan: ${error}`);
          return res.status(500).send("An error occurred");
      }

      const pingResults = stdout;
      res.send(pingResults);
  });
});


app.post("/dns-nsec-enum", (req, res) => {
  const target = req.body.target;

  if (!target) {
    return res.status(400).send("Target is required");
  }

  // Run Nmap DNS NSEC Enum command
  const command = `nmap --script dns-nsec-enum -p 53 ${target}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing DNS NSEC Enum: ${error}`);
      return res.status(500).send("An error occurred");
    }

    const nsecResults = stdout;
    res.send(nsecResults);
  });
});

app.post("/http-enum", (req, res) => {
  const target = req.body.target;

  if (!target) {
    return res.status(400).send("Target is required");
  }

  // Run Nmap HTTP Enumeration command
  const command = `nmap --script http-enum ${target}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing HTTP Enumeration: ${error}`);
      return res.status(500).send("An error occurred");
    }

    const httpEnumResults = stdout;
    res.send(httpEnumResults);
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
