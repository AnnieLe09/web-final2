function creElem(heading, attrs, children) {
    let element = document.createElement(heading);

    if (typeof(attrs) === 'string') {
        if (attrs !== '')
            element.setAttribute('class', attrs);
    }
    else
        for (let key in attrs) {
            element.setAttribute(key, attrs[key]);
        }

    try {
        children.forEach(child=>element.appendChild(child));
    }
    catch(err) {
        element.appendChild(children);
    }

    return element;
}

function handleNav(nav_list) {
    let ul = creElem('ul','navbar-nav m-auto mb-2 mb-lg-0',[]);
    nav_list.forEach(button=>{
        if (button.dropdown == undefined) {
            let name = document.createTextNode(button.name);
            let a = creElem('a',{class:'nav-link',href:button.link},[name]);

            let li = creElem('li','nav-item',a);
            ul.appendChild(li);
        }
        else {
            let name = document.createTextNode(button.name);
            let a = creElem('a',{
                class:'nav-link dropdown-toggle',
                href:'#',
                id:'navbarDropdown',
                role:'button'
            },name);
            a.setAttribute('data-bs-toggle','dropdown');
            a.setAttribute('aria-expanded','false');

            let subul = creElem('ul','dropdown-menu',[]);
            a.setAttribute('aria-labelledby','navbarDropdown');
            button.dropdown.forEach(subbutton=>{
                let subname = document.createTextNode(subbutton.name);
                let suba = creElem('a',{class:'dropdown-item', href:subbutton.link},subname);
                
                let subli = creElem('li','',[suba]);
                subul.appendChild(subli);
            })
            
            let li = creElem('li','nav-item dropdown',[a,subul]);
            ul.appendChild(li);
        }
    });
    let nav = creElem('div',{class:'collapse navbar-collapse',id:'navbarSupportedContent'},ul);

    return nav;
}

function handleNavbar(mode) {
    // mode : ["guest","admin","manager","related-people"]
    let nav_list = [];
    if (mode === "admin") {
        nav_list = 
        [
            {
                name:"QU???N L??",
                dropdown:
                [
                    {
                        name:"XEM DANH S??CH",
                        link:"/admin/managers/list-manager-page.html"
                    },
                    {
                        name:"TH??M NG?????I QU???N L??",
                        link:"/admin/managers/add-manager-page.html"
                    },
                    {
                        name:"L???CH S??? HO???T ?????NG",
                        link:"/admin/managers/list-manager-history-page.html"
                    }
                ]
            },
            {
                name:"?????A ??I???M",
                dropdown:
                [
                    {
                        name:"XEM DANH S??CH",
                        link:"/admin/addresses/list-addresses-page.html"
                    },
                    {
                        name:"TH??M ?????A ??I???M",
                        link:"/admin/addresses/add-address-page.html"
                    }
                ]
            }
        ];
    }
    else if (mode === "manager") {
        nav_list = 
        [
            {
                name:"NG?????I LI??N QUAN COVID-19",
                dropdown:
                [
                    {
                        name:"DANH S??CH",
                        link:"/manager/related-people"
                    },
                    {
                        name:"TH??M NG?????I M???I",
                        link:"/manager/related-people/add-new-one"
                    }
                ]
            },
            {
                name:"NHU Y???U PH???M",
                dropdown:
                [
                    {
                        name:"G??I S???N PH???M",
                        link:"#"
                    },
                    {
                        name:"S???N PH???M",
                        link:"/manager/products/product-list-page.html"
                    }
                ]
            },
            {
                name:"TH???NG K??",
                link:"#"
            },
            {
                name:"THANH TO??N",
                link:"/manager/payment"
            }
        ];
    }
    else if (mode === "related-people") {
        nav_list = 
        [
            {
                name:"TH??NG TIN C?? NH??N",
                link:"/related-people/information.html"
            },
            {
                name:"NHU Y???U PH???M",
                link:"/related-people/package-list.html"
            },
            {
                name:"T??I KHO???N",
                link:"#"
            }
        ];
    }

    

    let img = creElem('img',{class:'logo-img', src:"/images/Logo.png", alt:"logo"},[]);
    let a = creElem('a',{class:"navbar-brand",href:"./"},img);
    
    let all_content = creElem('div','container-fluid',a);

    if (mode !== "guest") {
        let span = creElem("span","navbar-toggler-icon",[]);
        let button = creElem('button',{class:"navbar-toggler", type:"button"},span);
        button.setAttribute("data-bs-toggle","collapse");
        button.setAttribute("data-bs-target","#navbarSupportedContent");
        button.setAttribute("aria-controls","navbarSupportedContent");
        button.setAttribute("aria-expanded","false");
        button.setAttribute("aria-label","Toggle navigation");

        let avt_img = creElem('img',{class:'rounded-circle', src:"/images/avatar.jpg", style:"width:50px;"},[]);
        let avt_button = creElem('button',{type:'button', class:'avt btn rounded-circle'},avt_img);
        avt_button.setAttribute("data-bs-toggle","dropdown");
        avt_button.setAttribute("aria-expanded","false");

        let a1 = creElem('a',{class:'dropdown-item', href:'#'},[document.createTextNode("?????I M???T KH???U")]);
        let li1 = creElem('li','',a1);

        let a2 = creElem('a',{class:'dropdown-item', href:'/'},[document.createTextNode("????NG XU???T")]);
        let li2 = creElem('li','',a2);

        let ul = creElem('ul','dropdown-menu dropdown-menu-end', [li1, li2]);

        let avatar = creElem('div',{class:'btn-group', style:'float:right'},[avt_button,ul]);

        let togglers = creElem('div',{id:'togglers'},[button,avatar]);

        all_content.appendChild(togglers);
        all_content.appendChild(handleNav(nav_list));
    }


    let nav = document.querySelector("nav");
    nav.className = "navbar sticky-top navbar-expand-lg navbar-light bg-light";
    nav.appendChild(all_content);
}