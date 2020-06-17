 
let a=100;
let isClicked=false;
let lastClicked=false;
function cursorStileOnHover(el, e) {
    var id = el.getAttribute('id');
    var div = document.querySelector("#" + id);
    var resizers = document.querySelectorAll("#"+div.getAttribute('id')+" .resizer");
    var delta = 10; // the thickness of the hovered border areaF
    const rect= div.getBoundingClientRect();
          var  w = rect.right - rect.left, // width of the element
            h = rect.bottom - rect.top;     // height of the element
    let isDown=false;
    div.addEventListener('mousedown',function(e){
        if(!lastClicked){
        isClicked=true;
       isDown=true;
        offset = [
            div.offsetLeft - e.clientX,
            div.offsetTop - e.clientY
        ];
    }
    });
  
    document.addEventListener('mouseup',function(){
      isDown=false;
      isClicked=false;
    })
    
    document.addEventListener('mousemove',function(e){
        if(isDown){
            if(!lastClicked){
            mousePosition = {
                x : event.clientX,
                y : event.clientY
            };
             div.style.left=(mousePosition.x + offset[0]) + 'px';
             div.style.top= (mousePosition.y + offset[1]) + 'px';
        }
    }
    })
    for(let i=0 ; i<resizers.length;i++){
        resizers[i].addEventListener('mousedown',mousedownResize);
        function mousedownResize(e){
            lastClicked=true;
            if(isClicked==false){
            let prevX = e.clientX;
            let prevY = e.clientY;
            let prevLeft=div.offsetLeft;
            let prevTop=div.offsetTop;
            let currentResizer = e.target;
            window.addEventListener('mousemove',mousemove);
            const rect = div.getBoundingClientRect();
            // console.log(rect.top + " Yuxaridan mesafe ")
            window.addEventListener('mouseup',mouseup);
            function mousemove(e){
                if(currentResizer.classList.contains('se')){
                    div.style.width=rect.width - (prevX-e.clientX) + 'px';
                    div.style.height = rect.height - (prevY-e.clientY) + 'px';
                }else if(currentResizer.classList.contains('ne')){
                    div.style.width=rect.width - (prevX-e.clientX) +'px';
                    div.style.height=rect.height +(prevY-e.clientY)+ 'px';
                    div.style.top=prevTop- (prevY-e.clientY)+ 'px';
                }else if(currentResizer.classList.contains('sw')){
                    div.style.width=rect.width + (prevX-e.clientX) + 'px';
                    div.style.height = rect.height - (prevY-e.clientY) + 'px';
                    div.style.left=prevLeft - (prevX-e.clientX)+ 'px';
                }else if(currentResizer.classList.contains('nw')){
                    div.style.width=rect.width + (prevX-e.clientX) + 'px';
                    div.style.height = rect.height + (prevY-e.clientY) + 'px';
                    div.style.left=prevLeft - (prevX-e.clientX)+ 'px';
                    div.style.top=prevTop- (prevY-e.clientY)+ 'px';


                }
                
            }
            function mouseup(){
                window.removeEventListener('mouseup',mouseup);
                window.removeEventListener('mousemove',mousemove);
                lastClicked=false;

            }
        }

        }
    }
}
