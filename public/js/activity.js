
// Select Item Array Activity Text
var itemActivity = document.querySelectorAll(".activity-text");

console.log(itemActivity);

// Check If itemActivity element 2 is no Text
if (itemActivity[1].innerHTML === " ") {
    document.querySelectorAll(".box-form")[1].classList.add("hidden-form");
} else {
    document.querySelectorAll(".box-form")[1].classList.remove("hidden-form");
}