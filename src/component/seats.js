import React, { Component } from 'react';
import './seats.css';

class Seats extends Component {
    constructor() {
        super();

        this.randomN = [];
        this.itemsCenter = [];
        this.itemsLeft = [];
        this.itemsRight = [];

        this.init = () => {
            for( let i=0; i<this.props.howMany; i++ ) {
                this.randomN.push( i+1 );
                if( i <= 35 ) {
                    this.itemsCenter.push(
                        <li className="item" id={'seat-'+ (i+1)} key={i}></li>
                    )
                }
                if ( i > 35 ) {
                    Math.ceil(((i-35)/3)%2) === 1
                        ? this.itemsLeft.push( <li className="item" id={'seat-'+ (i+1)} key={i}></li> )
                        : this.itemsRight.push( <li className="item" id={'seat-'+ (i+1)} key={i}></li> )
                }
            }
        }
    }

    componentDidMount() {
        const randomN = this.randomN;
        let nowN = 0;
        let canClick = true;
        
        const items = document.getElementsByClassName('item');
        const jsMySeat = document.getElementById('jsMySeat');
        const jsSeatRow = document.getElementById('jsSeatRow');
        const jsSeatCol = document.getElementById('jsSeatCol');
        const jsSeatSide = document.getElementById('jsSeatSide');
        const jsAreaCheck = document.getElementsByName('jsAreaCheck');

        let areaSelected = [];

        const areaCheck = () => {
            for ( let i=0; i<jsAreaCheck.length; i++ ) {
                if (jsAreaCheck[i].checked) {
                    areaSelected.push(jsAreaCheck[i].value)   
                }
            }
        }

        const areaUncheck = () => {
            for ( let i=0; i<jsAreaCheck.length; i++ ) {
                jsAreaCheck[i].checked = false;
            }
        }

        const checkAreaChecked = (nowN) => {
            // 앞자리 체크됐을 경우
            if ( areaSelected.includes('front-seat')) {
                let temp = 0;
                let tempIndex = 0;
                for ( let i=nowN; i<randomN.length; i++ ) {
                    if ( randomN[i] >= 0 && randomN[i] <= 12) {
                        if (temp) {
                            randomN[tempIndex] = randomN[i];
                            randomN[i] = temp;
                        }
                        break;
                    } else if ( randomN[i] > 36 && randomN[i] <= 48 ) {
                        if (temp) {
                            randomN[tempIndex] = randomN[i];
                            randomN[i] = temp;
                        }
                        break;
                    } else {
                        if ( !temp ) {
                            temp = randomN[i];
                            tempIndex = i;
                        }
                        continue;
                    }
                }
            }
            if ( areaSelected.includes('no-front-seat')) {
                let temp = 0;
                let tempIndex = 0;
                for ( let i=nowN; i<randomN.length; i++ ) {
                    if ( randomN[i] >= 0 && randomN[i] <= 12) {
                        if ( !temp ) {
                            temp = randomN[i];
                            tempIndex = i;
                        }
                        continue;
                    } else if ( randomN[i] > 36 && randomN[i] < 47 ) {
                        if ( !temp ) {
                            temp = randomN[i];
                            tempIndex = i;
                        }
                        continue;
                    } else {
                        if (temp) {
                            randomN[tempIndex] = randomN[i];
                            randomN[i] = temp;
                        }
                        break;
                    }
                }
            }
            // console.log(nowN, areaSelected, randomN);
        }

        const shuffle = (array) => {
            var currentIndex = array.length, temporaryValue, randomIndex;
          
            while (0 !== currentIndex) {
          
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
          
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            console.log(array);
            return array;
        }

        
        const showMySeat = (id) => {
            let idSplit = parseInt(id.split('-')[1]);
            let rowValue, colValue;
            jsSeatSide.innerHTML = '';

            rowValue = Math.ceil(idSplit /6);
            colValue = Math.ceil(idSplit %6);

            if ( colValue === 0 ) {
                colValue = 6;
            }

            if ( rowValue > 6 ) {
                if ( colValue > 3 ) {
                    colValue -= 3;
                    jsSeatSide.innerHTML = '오른쪽 ';
                } else {
                    jsSeatSide.innerHTML = '왼쪽 ';
                }
                rowValue -= 6;
            }

            jsSeatRow.innerHTML = rowValue;
            jsSeatCol.innerHTML = colValue;
        }

        // 각 자리의 아이디값을 받아서 className을 추가해줌
        const setSeated = (id) => {
            for( let i=0; i<items.length; i++ ) {
                if ( items[i].classList.contains('active') ) {
                    items[i].classList.remove('active');
                    items[i].classList.add('seated');
                }
                if (id === items[i].id ) {
                    items[i].classList.add('active');
                }
            }
        }
        
        // 버튼 클릭시
        const whereIsMySeat = () => {
            if ( canClick ) {
                // console.log(jsSeatsArea.getElementsByTagName('radio')[0].selected);
                canClick = false;
                jsMySeat.classList.add('is-delay');
                if ( nowN < this.props.howMany ) {

                    // 지정 자리범위 체크
                    areaCheck();
                    if ( areaSelected ) {
                        checkAreaChecked(nowN);
                    }

                    // 번호 지정
                    let numberSeat = 'seat-' + randomN[nowN];
                    nowN++;

                    // 클릭한 자리에 className 추가.
                    setSeated(numberSeat);
                    showMySeat(numberSeat);

                    setTimeout( function() {
                        // 연속클릭 금지 딜레이
                        jsMySeat.classList.remove('is-delay');
                        canClick = true;

                        // 자리선택 초기화
                        areaUncheck();
                        areaSelected = [];
                    }, 1500);
                }
            }
        }

        // 자리 클릭시
        const thisIsMySeat = (event) => {
            const element = event.srcElement;
            if ( !element.classList.contains('active') && !element.classList.contains('seated') ) {
                // 클릭한 자리에 className 추가.
                setSeated(element.id);
                showMySeat(element.id);

                // seat-id에서 숫자만 추출.
                let idSplit = parseInt(element.id.split('-')[1]);

                // 추출한 아이디값에 해당하는 객체의 배열 내 위치값 추출.
                let idxSplice = randomN.indexOf(idSplit)+1;
                
                // 클릭한 자리의 아이디값을 가진 배열 내 객체를 맨 앞으로 이동시켜서, 클릭 된 것으로 위장.
                randomN.unshift(idSplit);
                randomN.splice(idxSplice, 1);
                
                // 인덱스 추가.
                nowN++;
            } 
        }

        for( let i=0; i<items.length; i++ ) {
            items[i].addEventListener('click', thisIsMySeat );
        }

        jsMySeat.addEventListener('click', whereIsMySeat);
        shuffle(randomN);
    }

    render() {
        this.init();
        return (
            <div className="seats-wrap">
                <p className="show-total">총 인원은 {this.props.howMany}명 입니다.</p>
                <form className="seats-area" id="jsSeatsArea">
                    <input type="radio" name="jsAreaCheck" value="all-seat" id="radioAll" />
                    <label for="radioAll">전체</label>
                    <input type="radio" name="jsAreaCheck" value="front-seat" id="radioFront" />
                    <label for="radioFront">앞자리</label>
                    <input type="radio" name="jsAreaCheck" value="no-front-seat" id="radioNoFront" />
                    <label for="radioNoFront">앞자리제외</label>
                </form>
                <div className="seats">
                    <ul className="items left">
                        {this.itemsLeft}
                    </ul>
                    <ul className="items center">
                        {this.itemsCenter}
                    </ul>
                    <ul className="items right">
                        {this.itemsRight}
                    </ul>
                </div>
                <p className="show-my-seat">
                    <span id="jsSeatSide"></span>
                    <span id="jsSeatRow">0</span>열&nbsp;
                    <span id="jsSeatCol">0</span>번째
                </p>
                <div className="button-wrap">
                    <button className="btn" id="jsMySeat">내 자리는?</button>
                </div>
            </div>
        )
    }
}

export default Seats;