// variable
const courses = document.querySelector('#courses-list');

const shoppingCartContent = document.querySelector('#cart-content tbody');

const clearCartBtn = document.querySelector('#clear-cart');







// eventListener
eventListener()
function eventListener(){
    courses.addEventListener('click' , buyCourse);

    // reamove course from cart
    shoppingCartContent.addEventListener('click' , removeCourse);

    // remove all courses from cart
    clearCartBtn.addEventListener('click' , clearCart);


    // show courses from srorage when loaded
    document.addEventListener('DOMContentLoaded', showCoursesOnLoad)
}








// function

// add the course to the cart
function buyCourse(e){

    e.preventDefault();

    // use delegtion for access to the course that select
    if(e.target.classList.contains('add-to-cart')){

        // access to the card div with parentelemt
        const course = e.target.parentElement.parentElement;

        // read value
        getCourseInfo(course);
    }
}


// getting the course info that selected by user
function getCourseInfo(course){

    // course info
    const courseInfo = {
        image:course.querySelector('img').src,
        title:course.querySelector('h4').textContent,
        price:course.querySelector('span').textContent,
        id:course.querySelectorAll('a')[1].getAttribute('data-id')

    }

    // adding the course to the cart
    addToCart(courseInfo)
}


// adding the course to the cart
function addToCart(cInfo){

    // creat <li> tag
    let row = document.createElement('tr');

    // build html templat
    row.innerHTML = `
    <tr>

    <td>
        <img src = '${cInfo.image}' width = "100px">
    </td>
    
    <td>${cInfo.title}</td>

    <td>${cInfo.price}</td>

    <td>
        <a class = "remove" href = "#" data-id = "${cInfo.id}">X</a>
    </td>
    </tr>
    `


    shoppingCartContent.appendChild(row)


    saveToStorage(cInfo)

}


// add to localStorage
function saveToStorage(course){

    // get array of courses from storage
    let courses = getFromStorage();


    // add the new courses to the array of course 
    courses.push(course);


    localStorage.setItem('courses' , JSON.stringify(courses))

}


// get content from storage
function getFromStorage(){
    let courses;


    // if courses exist before
    if(localStorage.getItem('courses')){
        courses = JSON.parse(localStorage.getItem('courses'))
    }else{
        // if not exist
        courses = []
    }

    return courses
}



// remove coures from the DOM
function removeCourse(e){


    let course , courseId;



    if(e.target.classList.contains('remove')){
        e.target.parentElement.parentElement.remove();
        course =  e.target.parentElement.parentElement
        courseId = course.querySelector('a').getAttribute('data-id')
    }



    // rempve course from LS
    removeCourseLS(courseId)

}


// rempve course from LS
function removeCourseLS(id){
    let coursesLS = getFromStorage();

    coursesLS.forEach(function(course , index){
        if(course.id === id){
            coursesLS.splice(index , 1)
        }
    });

    localStorage.setItem('courses' , JSON.stringify(coursesLS))
}




// remove all courses from DOM
function clearCart(e){
    while(shoppingCartContent.firstChild){
        shoppingCartContent.firstChild.remove()
    }


    clearCartLS()
}



// clear all course from localStorage
function clearCartLS(){
    localStorage.clear()
}




// show courses when document loaded and add courses onto the cart
function showCoursesOnLoad(){
    let coursesLS = getFromStorage();


    // add courses onto to the cart
    coursesLS.forEach(function(cInfo){
          // creat <li> tag
    let row = document.createElement('tr');

    // build html templat
    row.innerHTML = `
    <tr>

    <td>
        <img src = '${cInfo.image}' width = "100px">
    </td>
    
    <td>${cInfo.title}</td>

    <td>${cInfo.price}</td>

    <td>
        <a class = "remove" href = "#" data-id = "${cInfo.id}">X</a>
    </td>
    </tr>
    `
    shoppingCartContent.appendChild(row)
    });
}
