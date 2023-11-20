# PhishGuard

<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

![product-screenshot]

10 day hackathon project. I decided to create a chrome extension that will read webpage text, find email addresses, and use ZeroBounce API to determine its validity. Hopefully this will help people quickly determine what is a real email.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

#### Front End
* ![vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
* ![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
* ![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

#### Back End
* <img width="100" src="https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/4963e648-a2e9-4de3-97e5-439fa5b3cd93.png?auto=format,compress&size=150">

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

### Prerequisites
`npm i`

- @types/chrome
- @zerobounce/zero-bounce-sdk

### Installation

1. Get a API Key at [ZeroBounce API](https://www.zerobounce.net/) -- only 5 free credits
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `src/config.js`
    ```
    const REACT_APP_API_KEY = "YOUR API KEY";
    ```

<!-- ROADMAP -->
## Roadmap

- [ ] Make this nicer looking
- [ ] Add Error Alerts
- [ ] Get it on the extension store

See the [open issues](https://github.com/pink-hat-hacker/phish-guard/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

<a href="mailto:zyv@udel.edu" target="blank"><img align="center"
         src="https://img.shields.io/badge/gmail-EA4335.svg?style=for-the-badge&logo=gmail&logoColor=white"
         alt="PHH" height="30"/></a>

[![][linkedin-shield]][linkedin-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



[linkedin-url]: https://linkedin.com/in/zoe-yoyo-valladares
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[product-screenshot]: public/product.gif