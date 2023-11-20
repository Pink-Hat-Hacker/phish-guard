import { useState } from "react";
import Chart from "chart.js/auto";
import phishGuardLogo from "/icon.png";
import "./App.css";
import REACT_APP_API_KEY from "../public/config.ts"

function App() {
  const [phishingResults, setPhishingResults] = useState<any>();
  const [extractedEmails, setExtractedEmails] = useState<string[]>([]);
  const [checkingEmails, setCheckingEmails] = useState<boolean>(false);

  const ZEROBOUNCE_API_KEY = REACT_APP_API_KEY;

  const updateChart = (res: { status: any; invalid?: string[] }) => {
    const labels = res.status
      ? res.status.map((entry: Record<string, number>) => Object.keys(entry)[0])
      : [];
    const values = res.status
      ? res.status.map(
        (entry: Record<string, number>) => Object.values(entry)[0]
      )
      : [];

    console.log(phishingResults);
    console.log(`labels: ${labels}`);
    console.log(`values: ${values}`);

    const canvas = document.getElementById("myChart") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Could not get 2D rendering context.");
      return;
    }

    const data = {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "rgb(255, 199, 32)",
            "rgb(0, 174, 255)",
            "rgb(255, 56, 50)",
            "rgb(75, 244, 123)",
            "rgb(139, 131, 252)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    new Chart(ctx, {
      type: "doughnut",
      data: data,
    });
  };

  const extractStatus = (res: any) => {
    const statusCounts: any = {};
    const invalidEmails: string[] = [];

    // Loop through the email_batch array
    res.email_batch.forEach((emailInfo: any) => {
      const { address, status } = emailInfo;

      // Increment the status count
      statusCounts[status] = (statusCounts[status] || 0) + 1;

      // If the status is 'invalid', add the email to the invalidEmails array
      if (status === "invalid") {
        invalidEmails.push(address);
      }
    });

    // Calculate the percentage for each status
    const totalEmails = res.email_batch.length;
    const statusPercentages = Object.entries(statusCounts).map(
      ([status, count]) => ({
        [status]: ((count as number) / totalEmails) * 100,
      })
    );

    return {
      status: statusPercentages,
      invalid: invalidEmails,
    };
  };

  const checkForPhishing = async () => {
    if (extractedEmails.length === 0) {
      alert("No email addresses to check. Please extract emails first.");
      return;
    }
    setCheckingEmails(true);
    const emailBatch = extractedEmails.map((email) => {
      return { email_address: email, ip_address: null }; // Replace '1.1.1.1' with the actual IP address
    });
    // console.log(emailBatch);

    try {
      const response = await fetch(
        "https://bulkapi.zerobounce.net/v2/validatebatch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: ZEROBOUNCE_API_KEY,
            email_batch: emailBatch,
          }),
        }
      );

      const zbResult = await response.json();
      // console.log(zbResult);

      const emailStatus = extractStatus(zbResult);

      // console.log(emailStatus);

      setPhishingResults(emailStatus);
      updateChart(emailStatus);

      // console.log(phishingResults);
    } catch (error) {
      console.error("Error checking for phishing:", error);
      alert(`Error checking for phishing. Please try again. \n ${error}`);
    }
  };

  const extractEmails = () => {
    chrome.runtime.sendMessage({ action: "extractEmails" }, (response) => {
      if(response) {
        setExtractedEmails(response.emailAddresses);
      } else {
        alert("There are no email addresses on this page. Please try again on a different page!");
      }
    });
  };

  return (
    <>
      <div>
        <a href="https://github.com/pink-hat-hacker" target="_blank">
          <img src={phishGuardLogo} className="logo" alt="PhishGuard logo" />
        </a>
      </div>
      <h1>PhishGuard</h1>
      <div className="card">
        <button onClick={extractEmails}>Extract Emails</button>
        {extractedEmails.length > 0 ? (
          <div className="pg-scroll">
            <ul>
              {extractedEmails.map((email, index) => (
                <li key={index}>{email}</li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
        <button onClick={checkForPhishing}>Check for Phishing</button>
        {phishingResults?.invalid ? (
          <>
            <h4>Invalid Emails:</h4>
            <div className="pg-scroll-invalid">
              <ul>
                {phishingResults.invalid.map((email: string, index: number) => (
                  <li key={index}>{email}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <></>
        )}

        {checkingEmails ? <canvas id="myChart" width="320" height="320"></canvas> : <></>}
      </div>
    </>
  );
}

export default App;
