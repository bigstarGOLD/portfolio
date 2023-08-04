import React, { useEffect, useState } from 'react';
import './scroll.css';
import "./Slides.scss";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import figlet from "figlet";
import standard from "figlet/importable-fonts/Pagga.js";

figlet.parseFont("pagga", standard);

const Menu = ({ current, scrollToSection }) => {
  const menuItems = ['about me', 'skills', 'notepad', 'projects', 'career']
  return <ul>
    {
      menuItems.map(item => {
        return <li key={item}
          onClick={() => scrollToSection(item)}
          className={(current === item) ? "active" : ""}>
          {item}
        </li>
      })
    }
  </ul>
}

function Figlet({ text, color, bgc, ...props }) {
  const [ascii, setAscii] = useState('');

  useEffect(() => {
    figlet.text(text, {
      font: 'pagga',
    }, function (err, data) {
      if (err) return console.error(err);
      setAscii(data);
    });
  }, [text, props]);

  return <pre style={{ borderRadius:"2rem", padding: "4rem", fontSize: "1px", color: color, backgroundColor: bgc, textAlign: "center" }} {...props}>{ascii}</pre>
}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "home"
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateCurrentSection)
  }

  updateCurrentSection = () => {
    const { refs } = this;
    for (let key in refs) {
      const sectionPosition = this._getSectionPos(key);
      if (sectionPosition <= 0) {
        this.setState({ current: key })
      }
    }
  }

  scrollToSection = section => {
    const sectionPos = this._getSectionPos(section);
    this._scrollAnimationToSection(sectionPos, 300, section)
  }

  _scrollAnimationToSection = (sectionPosition, scrollDuration, section) => {
    const scrollIncrements = sectionPosition / (scrollDuration / 15);
    const currentWindowScrollPos = window.scrollY;
    let currentSectionPosition;

    const interval = (scrollIncrements < 0)
      // Scroll up
      ? setInterval(() => {
        // Get the current position of the section we want to go to
        currentSectionPosition = this._getSectionPos(section);
        // Continue to scroll until we reach the top of the section
        (-currentSectionPosition > 0)
          ? window.scrollBy(0, scrollIncrements)
          : clearInterval(interval);
      }, 15)
      // Scroll down
      : setInterval(() => {
        (window.scrollY <= sectionPosition + currentWindowScrollPos)
          ? window.scrollBy(0, scrollIncrements)
          : clearInterval(interval);
      }, 15);
  }

  _getSectionPos = (section) => this.refs[section].getBoundingClientRect().y - this._getMenuHeight();
  _getMenuHeight = () => this.menu.getBoundingClientRect().height;




  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <div
          className="nav"
          ref={elem => this.menu = elem}>
          <Menu current={this.state.current} scrollToSection={this.scrollToSection.bind(this)} />
        </div>
        <div className="container" >
          <div className="intro" ref={"about me"} style={{ color: "white" }}>
            <Figlet text={"Web Developer Portfolio"} color={"white"} />
            <div style={{ fontFamily: "Georgia", fontStyle: "italic", textAlign: "center" }}>
              개발의 배움은 끝이 없는 것 같습니다.<br />끝이 없는 배움은 개발자에겐 오히려 더 좋은 장점이자,<br />자신의 무기가 아닐까 싶습니다.
            </div>
          </div>

          <div ref={"skills"} style={{ height: "550px" }} >
            <h1 style={{ color: "black", fontFamily: "Last Ninja" }}>
              <Figlet text={"SKILLS"} color={"red"} />
            </h1>
            <div style={{ textAlign: "center", height: "30rem" }} className="profile-card">

              <img src="image/skills.jpg" style={{ width: "65%", marginTop: "40px" }} alt = "skills"/>
            </div>
          </div>
          <div ref={"notepad"} >
            <h1 style={{ marginBottom: "80px" }}>
              <Figlet text={"NOTEPAD"} color={"black"} />
            </h1>
            <article className="sale-item" style={{ float: "left", width: "50%", backgroundColor: "#ed8e7d" }}>
              <h1>TISTORY</h1>
              <p>공유와 지식을 쌓는 블로그</p>
              <ul>
                <li><a href="https://goldbigstar.tistory.com/" >· 유용하게 사용했던 Code</a></li>
              </ul>
              <img src="https://i.namu.wiki/i/CNVaHZuf0Gh8FzOCf15jCbi5hULtTNYHUrf_5U2bD-uAbShxafelnrNhFULo7O0JAZeTTq6_bSveUA5mOVtlyQ.svg"
                style={{ width: "50%" }} alt = "code1" />
            </article>
            <article className="sale-item" style={{ width: "50%", backgroundColor: "#ffe4df57" }}>
              <h1>NOTION</h1>
              <p>개발하면서 사용한 것들 & 참고한 내용들</p>
              <ul>
                <li><a href="https://www.notion.so/4c780a64d93c4e93890222d83743d938">· 지금까지 사용했던 Code 및 기억할 저장소</a></li>
              </ul>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/2048px-Notion-logo.svg.png" style={{ width: "10.8%" }} alt = "code2"/>
            </article>
          </div>
          <div>
            <div ref={"projects"} style={{ textAlign: "center", height: "900px", marginBottom:"200px" }}>
              <h1>
                <Figlet text={"PROJECTS"} color={"black"} />
              </h1>
              <div style={{ float: "left", height:"20rem", width: "30%", marginLeft: "18%" }}>
                
                <Slider {...settings} >
                  <div><img src="image/dashborad.PNG" style={{ width: "100%" }} alt = "db"/></div>
                  <div><img src="image/mes1.PNG" style={{ width: "100%" }} alt = "m1"/></div>
                  <div><img src="image/mes2.PNG" style={{ width: "100%" }} alt = "m2"/></div>
                  <div><img src="image/mes3.PNG" style={{ width: "100%" }} alt = "m3"/></div>
                  <div><img src="image/mes4.PNG" style={{ width: "100%" }} alt = "m4"/></div>
                  <div><img src="image/mes5.PNG" style={{ width: "100%" }} alt = "m5"/></div>
                </Slider>
              </div>
              <div style={{ float: "right", width: "30%", height:"20rem", marginRight: "18%", marginBottom:"200px" }}>
                <h5>MES 시스템 웹사이트 입니다.
                <br/>
                    재직한 회사에서 PHP, JAVASCRIPT, JQUERY, MYSQL을 이용하여 만든 시스템입니다.
                    처음에는 그래프나 여러 기능들이 없었지만, 회사를 다니면서 공부도 하고 많은 라이브러리 및
                    유용한 기능들을 찾다보니 배운 점도 많고 좋은 기능들도 많이 추가하기도 했습니다.
                </h5>
              </div>
              <div style={{ float: "left", height:"20rem", width: "30%", marginLeft: "18%", marginTop:"200px" }}>
                
                <Slider {...settings} >
                  <div><img src="image/pf1.PNG" style={{ width: "100%" }} alt = "pf1"/></div>
                  <div><img src="image/pf2.PNG" style={{ width: "100%" }} alt = "pf2"/></div>
                  <div><img src="image/pf3.PNG" style={{ width: "100%" }} alt = "pf3"/></div>
                  <div><img src="image/pf4.PNG" style={{ width: "100%" }} alt = "pf4"/></div>
                </Slider>
              </div>
              <div style={{ float: "right", width: "30%", height:"20rem", marginRight: "18%" }}>
                <h5>React로 만든 웹사이트 입니다.
                  요새 React를 많이 사용하기도 하고 어떤 좋은 기능들이 있나 찾아보기도 하고 공부하다 보니
                  React로 포트폴리오 웹사이트를 만들어 봤습니다.
                  확실히 사람들이 많이 사용하는 이유는 다 있구나. 생각을 하기도 했고, 기능들도 굉장히 많고 좋은 라이브러리도
                  있다고 생각했습니다.
                  아직은 배워가는 중이지만, 조금 더 공부를 해서 다른 여러 기능들을 사용해보고 싶은 마음입니다.
                </h5>
              </div>
            </div>
            
          </div>
          <div ref={"career"} className='career'>
            <ul>
              <li style={{ fontSize: "16px" }}>
                <Figlet text={"CAREER"} color={"white"} bgc={"hsl(228, 80%, 40%)"} />
                <br />
                <p>【TAEMAMA】 2017.03 ~ 2017.09</p>
                <p></p>
                <p>· Unity를 이용한 게임개발 (C#)</p>
                <br />
                <p>2019.07 ~ 2020.12</p>
                <p>【제이이엔지】</p>
                <p>· MES 구매/자재/통합경영정보 시스템 유지보수</p>
                <p>· MES 개발 관련 사업 산출물 작성</p>
                <br />
                <p>2021.01 ~ NOW</p>
                <p>【리얼인포】</p>
                <p>· 중소기업 MES 개발 및 운영, 구매/자재/통합경영정보 시스템 개발, SI 웹프로그램 개발</p>
                <p>· MES 개발 관련 산출물 사업시작부터 관여하여 작성</p>
                <p>· 고객사 방문하여 요구사항 회의 및 전반적인 MES 시스템 개발</p>
                <p>· 도입 기업의 공장 시스템에 맞게 MES 개발 (수주 관리, 구매, 생산 및 출하)</p>
                <p>· 사업 시작부터 전담하여 사업 완료 시점까지 개발 및 산출물 작성</p>
                <p>· Alien Code 코드 페이지 및 기능 정리</p>
                <p>· 고객사 매입, 매출현황 그래프 기능 (Datatables Server Side 방식) 개발</p>
                <p>· 고객사 Dashborad 요구사항에 맞춰 개발</p>
                <p>· MySQL 계층형 재귀쿼리 (MySQL 5.7 이하/이상) 사용하여 개발</p>
                <p>· Android studio를 이용한 간단한 바코드 입출력 개발</p>
                <p>· 웹으로 이용한 채팅프로그램 개발</p>
                <br />
                <hr />
                <br />
                <p>학력</p>
                <p>· 2012.03 ~ 2017.02 대전 보건대학 바이오정보과  졸업</p>
                <p>· 2009.03 ~ 2012.02  대전 송촌고등학교  졸업 </p>
                <br />
                <p>자격증</p>
                <p>· 해킹보안전문가 3급</p>
                <br />
                <p>교육 및 대외활동</p>
                <p>· 2016.08 ~ 2016.09 4회 k-Hackathon(해커톤)대회 참가 / 앱센터-대전보건대학</p>
              </li>
            </ul>

          </div>
        </div>
        <footer>
          <hr/>
          <Figlet text={"© 2023 GoldBigStar. All rights reserved"} color={"black"}  />
        </footer>
      </div>
    )
  }
}

export default App;