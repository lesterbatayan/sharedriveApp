import{_ as c,u as l,o as d,r as m,a as u,c as _,b as a,d as n,e as p,f as v}from"./index-4554ee0f.js";const f={class:"surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"},g={class:"flex flex-column align-items-center justify-content-center"},x={style:{"border-radius":"56px",padding:"0.3rem",background:`linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          )`}},b={class:"w-full surface-card py-8 px-5 sm:px-8",style:{"border-radius":"53px"}},h=p('<div class="text-center mb-5" data-v-d68fa5c6><img src="'+v+'" alt="Image" height="50" class="mb-3" data-v-d68fa5c6><div class="text-900 text-3xl font-medium mb-3" data-v-d68fa5c6>Welcome to Sharedrive</div><p class="mt-0 mb-4 text-700 line-height-3" data-v-d68fa5c6> A local ride-hailing app for Baguio and La Trinidad </p><span class="text-600 font-medium" data-v-d68fa5c6>Sign in to continue</span></div>',1),y={__name:"Login",setup(S){const r=l();function s(o,e,t){localStorage.setItem("user",o),localStorage.setItem("username",e),localStorage.setItem("userid",t),r.push("/")}return d(()=>{localStorage.removeItem("username"),localStorage.removeItem("user")}),(o,e)=>{const t=m("Button");return u(),_("div",f,[a("div",g,[a("div",x,[a("div",b,[h,a("div",null,[n(t,{label:"Sign In as Driver",class:"w-full p-3 text-xl m-1",onClick:e[0]||(e[0]=i=>s("driver","Driver","D1")),text:"",raised:""}),n(t,{label:"Sign In as Commuter",class:"w-full p-3 text-xl m-1",severity:"secondary",onClick:e[1]||(e[1]=i=>s("commuter","Commuter","C1")),text:"",raised:""})])])])])])}}},B=c(y,[["__scopeId","data-v-d68fa5c6"]]);export{B as default};
