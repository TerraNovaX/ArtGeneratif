<template>
    <div>
        <div class="title">
            warning
        </div>
        <div class="text">
            <div>
                Federal law provides severe civil and criminal penalties<br> for the unauthorized reproduction, 
                distribution or exhibition of<br> copyrighted motion pictures, video tapes or video discs. 
                Criminal<br> copyright infringement is investigated by the FBI and may constitute<br> a felony with a 
                maximum penalty of up to five years in prison and/or<br> a $250,000 fine.
            </div>
            <div>
                Licensed for private home exhibition<br> only. 
                Any public performance, copying<br> or other use 
                is strictly prohibited.<br> All other rights reserved.
            </div>
        </div>
    </div>
     <nav>
         <RouterLink to="/Home" class="button">press to continue ...</RouterLink>
     </nav>

</template>
<script>
</script>
<style>
.button{
    width: max-content;
    background-color: transparent;
    color: white;
    border:none;
    font-family:  'Jaini Purva', sans-serif;
    font-size: 24px;
}
.button:hover{
    background-color: transparent;
}
.title{
    color: #CF0001;
    font-size: 118px;
    font-weight: 600;
    text-align: center;
    text-transform:uppercase;
    letter-spacing: 5px;
}
.text{
    letter-spacing: 5px;
    text-align: center;
    font-size: 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    word-spacing: 10px;
}
</style>