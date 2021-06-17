window.addEventListener("load", () => {
    // $.getJSON("/data.json", (data) => {
        // let app = new App(data);
    // })
    let app = new App();
});

class App {
    constructor() {
        this.text = [{
            "text" : "삶이 있는 한 희망은 있다.",
            "writer" : "키케로"
        },
        {
            "text" : "산다는 것 그것은 치열한 전투이다.",
            "writer" : "로망 로랑"
        },
        {
            "text" : "하루에 3시간을 걸으면 7년 후에 지구를 한바퀴 돌 수 있다.",
            "writer" : "사무엘 존슨"
        },
        {
            "text" : "언제나 현재에 집중할 수 있다면 행복할 것이다.",
            "writer" : "파울로 코엘료"
        },
        {
            "text" : "신은 용기있는 자를 결코 버리지 않는다.",
            "writer" : "켄러"
        },
        {
            "text" : "피할 수 없으면 즐겨라.",
            "writer" : "로버트 엘리엇"
        },
        {
            "text" : "우리를 향해 열린 문을 보지 못하게 된다.",
            "writer" : "헬렌 켈러"
        },
        {
            "text" : "행복은 습관이다, 그것을 몸에 지니라.",
            "writer" : "허버드"
        },
        {
            "text" : "자신감 있는 표정을 지으면 자신감이 생긴다.",
            "writer" : "찰스 다윈"
        },
        {
            "text" : "평생 살 것처럼 꿈을 꾸어라. 그리고 내일 죽을 것처럼 오늘을 살아라.",
            "writer" : "제임스 딘"
        },
        {
            "text" : "꿈을 계속 간직하고 있으면 반드시 실현할 때가 온다.",
            "writer" : "괴테"
        }];
        this.index = 0;
        this.main();
    }
    main() {
        let startTime;
        let endTime;
        let count = 0;
        let status = false;
        this.setText();
        let texts = this.text;
        let index = this.index;
        let index_temp = index;
        let interval;
        let now_input = "";
        let temp_input = "";
        $(".typing").on("input", function () {
            
            if (status != true) {
                startTime = new Date().getTime();
                status = true;
                interval = setInterval(() => {
                    endTime = new Date().getTime();
                    let max = $(".max").text().substring(12, $(".max").text().length) * 1;
                    if (Math.round((count / ((endTime - startTime) / 1000)) * 60) >= max) {
                        $(".now").css({ "color": "red" });
                    } else {
                        $(".now").css({ "color": "gray" });
                    }
                    $(".now").text("Now Speed : " + Math.round((count / ((endTime - startTime) / 1000)) * 60));
                    now_input = $(".typing").val();
                    if (now_input.length == 0) {
                        count = 0;
                        $(".now").text("Now Speed : 0");
                        clearInterval(interval);
                        status = false;
                        temp_input = "";
                        $(".now").css({ "color": "gray" });
                        $(".red_text").css({ "color": "#666666" });
                    }
                }, 200);
            }
            now_input = $(".typing").val();
            let answer = texts[index].text.split("");
            if (temp_input.length <= now_input.length) {
                count = count + 1;
                $(".now").text("Now Speed : " + Math.round((count / ((endTime - startTime) / 1000)) * 60));
                temp_input = now_input;
            } else if (temp_input.length > now_input.length && count > 0) {
                count = count - 1;
                $(".now").text("Now Speed : " + Math.round((count / ((endTime - startTime) / 1000)) * 60));
                temp_input = now_input;
            } else if (count == 0 || now_input.length == 0) {
                $(".now").css({ "color": "gray" });
                count = 0;
                clearInterval(interval);
                status = false;
                temp_input = "";
                $(".red_text").css({ "color": "#666666" });
            }
            let my_answer = $(".typing").val().split("");
            for (let i = 0; i < my_answer.length; i++) {
                if (answer[i] != my_answer[i]) {
                    $(".red_text").eq(i).css({ "color": "red" });
                } else {
                    $(".red_text").css({ "color": "#666666" });
                }
            }
            

            $(".typing").on("keydown", function () {

                if (window.event.keyCode == 13) {
                    if (texts[index].text == $(".typing").val()) {

                        endTime = new Date().getTime();
                        let max = $(".max").text().substring(12, $(".max").text().length) * 1;
                        let sum = Math.round((count / ((endTime - startTime) / 1000)) * 60);
                        if (max < sum) {
                            if (sum > 1500) {
                                $(".max").text("Max Speed : " + 2000);
                            } else {
                                $(".max").text("Max Speed : " + sum);
                            }
                        }
                        count = 0;
                        $(".typing").val("");
                        index = Math.floor(Math.random() * texts.length);
                        if (index_temp == index && index != 0) {
                            index -= 1;
                            index_temp = index;
                        } else if (index == 0) {
                            index += 1;
                            index_temp = index;
                        } else {
                            index_temp = index;
                        }
                        $(".now").text("Now Speed : 0");
                        $(".writer").text(texts[index].writer);
                        $(".content").empty();
                        let answer = texts[index].text.split("");
                        for (let i = 0; i < answer.length; i++) {
                            let innerText = answer[i];
                            let div = document.createElement('div');
                            if (innerText == " ") {
                                div.innerHTML = `&nbsp;`;
                            } else {
                                div.innerHTML = `${innerText}`;
                            }
                            div.classList.add('red_text');
                            document.querySelector(".content").appendChild(div);
                        }
                        $(".now").css({ "color": "gray" });
                        clearInterval(interval);
                        status = false;
                    }

                } else if (window.event.keyCode == 27) {
                    count = 0;
                    $(".now").text("Now Speed : 0");
                    clearInterval(interval);
                    status = false;
                    temp_input = "";
                    $(".typing").val("");
                    $(".red_text").css({ "color": "#666666" });
                }
            });


        });
    }
    setText() {
        let texts = this.text;
        this.index = Math.floor(Math.random() * texts.length);
        let answer = texts[this.index].text.split("");
        for (let i = 0; i < answer.length; i++) {
            let innerText = answer[i];
            let div = document.createElement('div');
            if (innerText == " ") {
                div.innerHTML = `&nbsp;`;
            } else {
                div.innerHTML = `${innerText}`;
            }
            div.classList.add('red_text');
            document.querySelector(".content").appendChild(div);
        }
        $(".writer").text(texts[this.index].writer);
    }
}
