Ext.BLANK_IMAGE_URL="js/extjs/resources/images/default/s.gif";function log(){if(console){console.log.apply(this,arguments)}}function _(a){try{var c=i18n[a];if(c===undefined){c=a;log("FIX ME : i18n not found for the string: "+a)}return c}catch(b){return a}}function XHR(c){var b=c.success,d=c.failure,a=c.callback;c.url="./do/"+c.params.task;delete c.params.task;c.failure=c.success=Ext.emptyFn;c.callback=function(g,j,f){var i=null;try{i=Ext.decode(f.responseText)}catch(h){log("Invalid XHR JSON Response:"+f.responseText)}if(j&&i&&i.success){if(b!==undefined){Ext.callback(b,c.scope,[f,g])}}else{if(d!==undefined){Ext.callback(d,c.scope,[f,g])}}if(a!==undefined){Ext.callback(a,c.scope,[g,j,f])}};Ext.Ajax.request(c)}Ext.namespace("Ext.ux.plugins");Ext.ux.IconCombo=Ext.extend(Ext.form.ComboBox,{initComponent:function(){Ext.apply(this,{tpl:'<tpl for="."><div class="x-combo-list-item ux-icon-combo-item"><div class="{'+this.iconClsField+'}" style="position:absolute"></div><div class="ux-icon-combo-value">{'+this.displayField+"}</div></div></tpl>"});Ext.ux.IconCombo.superclass.initComponent.call(this)},onRender:function(b,a){Ext.ux.IconCombo.superclass.onRender.call(this,b,a);this.wrap.applyStyles({position:"relative"});this.el.addClass("ux-icon-combo-input");this.icon=Ext.DomHelper.append(this.el.up("div.x-form-field-wrap"),{tag:"div",style:"position:absolute"})},setIconCls:function(){var a=this.store.query(this.valueField,this.getValue()).itemAt(0);if(a){this.icon.className=a.get(this.iconClsField)}},setValue:function(a){Ext.ux.IconCombo.superclass.setValue.call(this,a);this.setIconCls()}});Ext.reg("iconcombo",Ext.ux.IconCombo);Ext.override(Ext.Window.DD,{startDrag:function(){var a=this.win;a.fireEvent("ghost",[]);this.proxy=a.ghost();if(a.constrain!==false){var c=a.el.shadowOffset;this.constrainTo(a.container,{right:c,left:c,bottom:c})}else{if(a.constrainHeader!==false){var b=this.proxy.getSize();this.constrainTo(a.container,{right:-(b.width-this.headerOffsets[0]),bottom:-(b.height-this.headerOffsets[1])})}}}});Ext.override(Ext.Window,{setZIndex:function(b){var a=++b;if(this.modal){this.mask.setStyle("z-index",b)}this.el.setZIndex(a);b+=5;if(this.resizer){this.resizer.proxy.setStyle("z-index",++b)}if(a>this.lastZIndex){this.fireEvent("tofront",this)}else{this.fireEvent("toback",this)}this.lastZIndex=b}});Ext.ux.plugins.WindowDrawer=Ext.extend(Ext.Window,{closable:false,resizable:false,show:function(c,a,b){if(this.hidden&&this.fireEvent("beforeshow",this)!==false){this.hidden=false;this.onBeforeShow();this.afterShow(!!c,a,b)}},hide:function(c,a,b){if(this.hidden){return}if(this.animate===true&&!c){if(this.el.shadow){this.el.disableShadow()}this.el.slideOut(this.alignToParams.slideDirection,{scope:this,duration:this.animDuration||0.25,callback:function(){this.el.removeClass("x-panel-animated");if(typeof a=="function"){a.call(b||this)}}})}else{Ext.ux.plugins.WindowDrawer.superclass.hide.call(this,null,a,b)}this.hidden=true},init:function(a){this.win=a;this.resizeHandles=this.side;this.shim=a.shim;a.drawers=a.drawers||{};a.drawers[this.side]=this;a.on({scope:this,tofront:this.onBeforeShow,toback:this.onBeforeShow,ghost:this.onBeforeResize,move:this.alignAndShow,resize:this.alignAndShow,destroy:this.destroy,render:function(b){this.render(b.el.parent())},beforecollapse:function(){if(!this.hidden){this.wasVisible=true;this.hide(true)}},expand:function(){if(this.showAgain=this.wasVisible){this.alignAndShow()}},beforehide:function(){this.wasVisible=!this.hidden;this.hide(true)}})},initComponent:function(){Ext.apply(this,{frame:true,draggable:false,modal:false,closeAction:"hide",alignToParams:{}});this.on({scope:this,beforeshow:this.onBeforeShow,beforehide:this.onBeforeHide});if(this.size){if(this.side=="e"||this.side=="w"){this.width=this.size}else{this.height=this.size}}Ext.ux.plugins.WindowDrawer.superclass.initComponent.call(this)},onBeforeResize:function(){if(!this.hidden){this.showAgain=true}this.hide(true)},onBeforeHide:function(){if(this.animate){this.getEl().addClass("x-panel-animated")}},onBeforeShow:function(){if(this.animate){this.el.addClass("x-panel-animated")}this.setAlignment();this.setZIndex(this.win.el.getZIndex()-3)},afterShow:function(c,a,b){if(this.animate&&!c){this.el.slideIn(this.alignToParams.slideDirection,{scope:this,duration:this.animDuration||0.25,callback:function(){this.el.removeClass("x-panel-animated");if(this.el.shadow){this.el.enableShadow(true)}this.el.show();if(typeof a=="function"){a.call(b||this)}}})}else{Ext.ux.plugins.WindowDrawer.superclass.afterShow.call(this);if(typeof a=="function"){a.call(b||this)}}this.wasVisible=true},alignAndShow:function(){this.setAlignment();if(this.showAgain){this.show(true)}this.showAgain=false},setAlignment:function(){switch(this.side){case"n":this.setWidth(this.win.el.getWidth()-10);Ext.apply(this.alignToParams,{alignTo:"tl",alignToXY:[5,(this.el.getComputedHeight()*-1)+5],slideDirection:"b"});break;case"s":this.setWidth(this.win.el.getWidth()-10);Ext.apply(this.alignToParams,{alignTo:"bl",alignToXY:[5,(Ext.isIE6)?-2:-7],slideDirection:"t"});break;case"e":this.setHeight(this.win.el.getHeight()-10);Ext.apply(this.alignToParams,{alignTo:"tr",alignToXY:[-5,5],slideDirection:"l"});break;case"w":this.setHeight(this.win.el.getHeight()-10);Ext.apply(this.alignToParams,{alignTo:"tl",alignToXY:[(this.el.getComputedWidth()*-1)+5,5],slideDirection:"r"});break}if(!this.hidden){this.el.alignTo(this.win.el,this.alignToParams.alignTo,this.alignToParams.alignToXY);if(Ext.isIE){this.bwrap.hide();this.bwrap.show()}}this.doLayout()},toFront:function(){this.win.toFront();return this}});Ext.reg("windowdrawer",Ext.ux.plugins.WindowDrawer);var loginPage=function(){Ext.QuickTips.init();Ext.BLANK_IMAGE_URL="js/extjs/resources/images/default/s.gif";return{storeLang:"",storeProject:"",init:function(){this.storeLang=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:"./do/getAvailableLanguage"}),reader:new Ext.data.JsonReader({root:"Items",totalProperty:"nbItems",id:"code"},Ext.data.Record.create([{name:"code",mapping:"code"},{name:"iconCls",mapping:"iconCls"},{name:"name",mapping:"name"}]))});this.storeLang.load({scope:this,callback:function(){this.storeProject.load()}});this.storeProject=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:"./do/getAvailableProject"}),reader:new Ext.data.JsonReader({root:"Items",totalProperty:"nbItems",id:"code"},Ext.data.Record.create([{name:"code",mapping:"code"},{name:"iconCls",mapping:"iconCls"},{name:"name",mapping:"name"}]))});this.storeProject.on("load",function(){this.drawForm()},this)},drawForm:function(){var a;if(!a){a=new Ext.Window({layout:"border",width:380,height:250,closable:false,closeAction:"hide",resizable:false,plain:true,title:"Control Access",iconCls:"iconKey",plugins:[new Ext.ux.plugins.WindowDrawer({html:'To request a VCS account please read :<div style="text-align: center; margin-top: 20px;"><a href="http://php.net/svn-php.php" target="_blank">http://php.net/svn-php.php</a></div>',side:"s",bodyStyle:"margin: 10px;",animate:true,resizable:false,height:80})],listeners:{render:function(){new Ext.util.DelayedTask(function(){Ext.getCmp("login-form-vcsLogin").focus()}).delay(200)}},items:[{xtype:"panel",baseCls:"x-plain",id:"login-logo",region:"center",bodyStyle:"margin:4px 4px 4px 8px",html:'<img src="themes/img/logo.png" />'},{xtype:"form",region:"south",id:"login-form",url:"./do/login",bodyStyle:"padding:5px 5px 0",border:false,height:120,width:350,labelWidth:110,defaults:{width:217},defaultType:"textfield",items:[{xtype:"iconcombo",width:235,fieldLabel:"Project",store:this.storeProject,triggerAction:"all",allowBlank:false,valueField:"code",displayField:"name",iconClsField:"iconCls",iconClsBase:"project",mode:"local",value:"php",listWidth:235,maxHeight:150,editable:true,id:"login-form-project",name:"projectDisplay",listeners:{afterrender:function(b){if(directAccess){b.focus();b.onLoad();b.setValue(directAccess.project);b.collapse();b.disable()}}}},{fieldLabel:"VCS login",name:"vcsLogin",value:"anonymous",id:"login-form-vcsLogin",enableKeyEvents:true,listeners:{keypress:function(c,b){if(b.getKey()==b.ENTER){Ext.getCmp("login-form-vcsPasswd").focus()}}}},{fieldLabel:"VCS password",name:"vcsPassword",id:"login-form-vcsPasswd",inputType:"password",enableKeyEvents:true,listeners:{keypress:function(c,b){if(b.getKey()==b.ENTER){Ext.getCmp("login-form-lang").focus()}}}},{xtype:"iconcombo",width:235,fieldLabel:"Language module",store:this.storeLang,triggerAction:"all",allowBlank:false,valueField:"code",displayField:"name",iconClsField:"iconCls",iconClsBase:"flags",mode:"local",value:"en",listWidth:235,maxHeight:150,editable:true,id:"login-form-lang",name:"langDisplay",enableKeyEvents:true,listeners:{keypress:function(c,b){if(b.getKey()==b.ENTER){Ext.getCmp("login-btn").fireEvent("click")}},afterrender:function(b){if(directAccess){b.focus();b.onLoad();b.setValue(directAccess.lang);b.collapse();b.disable()}}}}]}],buttonAlign:"left",buttons:[{text:"Request an account",iconCls:"iconHelp",tabIndex:-1,handler:function(){if(a.drawers.s.hidden){a.drawers.s.show()}else{a.drawers.s.hide()}}},"->",{text:"Login",id:"login-btn",disabled:false,listeners:{click:function(){if(Ext.getCmp("login-form").getForm().isValid()){Ext.getCmp("login-form").getForm().submit({method:"POST",params:{lang:Ext.getCmp("login-form-lang").getValue(),project:Ext.getCmp("login-form-project").getValue()},waitTitle:"Connecting",waitMsg:"Sending data...",success:function(b,c){window.location.reload()},failure:function(b,c){if(c.response){var d=Ext.util.JSON.decode(c.response.responseText);if(d.msg=="Bad vcs password"||d.msg=="Bad db password"){Ext.Msg.show({title:"Error",msg:"Bad password.<br>Please, try again.",buttons:Ext.Msg.OK,icon:Ext.MessageBox.ERROR,fn:function(){Ext.getCmp("login-form-vcsPasswd").focus()}})}if(d.msg=="unknow from vcs"){Ext.Msg.show({title:"Error",msg:"This user is unknow from Php vcs server.<br>Please, try again.",buttons:Ext.Msg.OK,icon:Ext.MessageBox.ERROR,fn:function(){Ext.getCmp("login-form-vcsPasswd").focus()}})}}}})}}}}]})}a.show();Ext.get("loading").remove();Ext.fly("loading-mask").fadeOut({remove:true})}}}();Ext.EventManager.onDocumentReady(loginPage.init,loginPage,true);