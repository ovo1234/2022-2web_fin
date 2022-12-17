const bt1 = document.querySelector("#bt1");
const bt2 = document.querySelector("#bt2");

bt1.addEventListener("click", () => {
    location.href = "./account_input.html";
})

bt2.addEventListener("click", () => {
    if (confirm("정말로 삭제하시겠습니까?") == true){ 
        localStorage.clear();
        alert("삭제 되었습니다.");
      }else{
        alert("삭제 되지 않았습니다.");
      }
})