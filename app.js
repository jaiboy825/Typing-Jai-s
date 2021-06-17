window.addEventListener("load", () => {
    $.getJSON("/data.json", (data) => {
        let app = new App(data);
    })
});

class App {
    constructor(text) {
        this.text = text;
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
                    }
                }, 200);
            }
            now_input = $(".typing").val();
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
            }
            let answer = texts[index].text.split("");
            console.log(answer);
            let my_answer = $(".typing").val().split("");
            for (let i = 0; i < my_answer.length; i++) {
                if (answer[i] != my_answer[i]) {
                    $(".red_text").eq(i).css({"color" : "red"});
                } else {
                    $(".red_text").css({"color" : "#666666"});
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
