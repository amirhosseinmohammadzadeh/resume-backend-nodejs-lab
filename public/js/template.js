var template = {
	path : null,
	title: null,
	location: null,
	process: {},
	session: {},
	sessionReset: function(){
		this.session = {};
	},
	setSession: function(){
		if(this.session.setSession)return;
		this.session.setSession = true;
		ajax.post('/users/get/session',{},'page-loading',function(data){
			template.session.setSession = false;
			if(data.error != undefined){
				template.session.groupId = '0';
				template.session.groupName = 'guest';
				template.session.username = null;
				template.session.userId = null;
				return;
			}
			template.session.groupId = data.groupId;
			template.session.groupName = data.groupName;
			template.session.username = data.username;
			template.session.userId = data.userId;
		});
	},
	setContent: function(id,data){
		$(document.getElementById(id)).hide().html(data).fadeIn(300);
	},
	page: {
		home:{
			open:function(){
				if(template.session.groupId == undefined){
					template.setSession();
					setTimeout(function(){template.page.home.open();},200);
					return;
				}
				if(template.session.groupId == '0')
					this.appContainer(templateDatas.homeLoginContent);
				else template.page.home.showPanel();
			},
			appContainer:function(data){
				$(document.getElementById('container')).hide().html(data).fadeIn(1000);
			},
			showPanel: function(){
				let cat = this.category();
				this.appContainer(templateDatas.homePanelContent.replace(/\{\$category\}/g,cat));
				template.page.user.open();
			},
			category: function(activeId = false){
				let groupId = template.session.groupId;
				let dataItemsKey = {
					'homePanelCategoryUsers':['1','2','3'],
					'homePanelCategoryBackup':['2'],
					'homePanelCategoryStock':['1','2','3'],
					'homePanelCategoryReports':['1','2','3'],
					'homePanelCategoryRequests':['1','2','3'],
					'homePanelCategoryLogout':['1','2','3','4','5'],
				}
				let items = '';
				let key;
				if(activeId){
					for(key in dataItemsKey){
						if(!document.getElementById(key))continue;
						if(key == activeId)document.getElementById(key).classList.add('active');
						else document.getElementById(key).classList.remove('active');
					}
					return;
				}
				for(key in dataItemsKey){
					let find = dataItemsKey[key].find(function(element){return (element == groupId) ? true : false;});
					if(!find)continue;
					items += templateDatas[key];
				}
				let cat = templateDatas.homePanelCategory.replace(/\{\$item\}/g,items);
				return cat;
			},
			panelContainer: function(data){
				$(document.getElementById('home-panel-container')).hide().html(data).fadeIn(1000);
			},
			api:{
				login:function(){
					var username = document.getElementById('home-login-form-username').value;
					var password = document.getElementById('home-login-form-password').value;
					if(!username)return;
					if(!password)return;
					var post = {username:username,password:password};
					ajax.post('/users/login',post,'page-loading',function(data){
						if(!data.userId){
							template.setContent('home-login-form-alert-box',templateDatas.homeLoginErrorUserPass);
							return;
						}
						template.setContent('home-login-form-alert-box',templateDatas.homeLoginSuccess);
						template.sessionReset();
						template.page.home.open();
					});
				},
				logout: function(){
					ajax.post('/users/logout',{},'page-loading',function(data){
						template.sessionReset();
						template.page.home.open();
					})
				},
			},
		},
		user:{
			open : function(){
				template.page.home.category('homePanelCategoryUsers');
				let users = templateDatas.users;
				users = users.replace(/\{\$category\}/g,this.category());
				template.page.home.panelContainer(users);
				template.page.user.printUsersSelect();
			},
			usersContainer: function(data){
				$(document.getElementById('users-container')).hide().html(data).fadeIn(1000);
			},
			usersSelectContainer: function(data){
				 $(document.getElementById('users-select-container')).hide().html(data).fadeIn(1000);
			},
			printUsersSelect : function(){
				this.category('usersCategoryList');
				let write = templateDatas.usersSelectTemp;
				template.page.user.usersContainer(write);
				template.page.user.printUsersList();
			},
			category :function(activeId = false){
				let groupId = template.session.groupId;
				let dataItemsKey = {
					'usersCategoryCreate':['1'],
					'usersCategoryList':['1','2','3'],
					'usersCategoryProfile':['1','2','3'],
				}
				let items = '';
				let key;
				if(activeId){
					for(key in dataItemsKey){
						if(!document.getElementById(key))continue;
						if(key == activeId)document.getElementById(key).classList.add('active');
						else document.getElementById(key).classList.remove('active');
					}
					return;
				}
				for(key in dataItemsKey){
					let find = dataItemsKey[key].find(function(element){return (element == groupId) ? true : false;});
					if(!find)continue;
					items += templateDatas[key].replace(/\{\$myid\}/g,template.session.userId);
				}
				let cat = templateDatas.usersCategory.replace(/\{\$item\}/g,items);
				return cat;
			},
			printUsersList : function(){
				let phoneNumber = document.getElementById('user-select-form-filter-phone-number').value;
				let phoneCityCode = document.getElementById('user-select-form-filter-phone-city-code').value;
				let username = document.getElementById('user-select-form-filter-username').value;
				let firstname = document.getElementById('user-select-form-filter-firstname').value;
				let lastname = document.getElementById('user-select-form-filter-lastname').value;
				let birtdayStart = document.getElementById('user-select-form-filter-birtday-start').value;
				let birtdayEnd = document.getElementById('user-select-form-filter-birtday-end').value;
				let email = document.getElementById('user-select-form-filter-email').value;
				let nationalCode = document.getElementById('user-select-form-filter-national-code').value;
				let city = document.getElementById('user-select-form-filter-city').value;
				let postCode = document.getElementById('user-select-form-filter-post-code').value;
				let registerStart = document.getElementById('user-select-form-filter-register-start').value;
				let registerEnd = document.getElementById('user-select-form-filter-register-end').value;
				let groupName = document.getElementById('user-select-form-filter-group-name').value;
				var con = {};
				if(phoneNumber)con.phoneNumber = '%'+phoneNumber+'%';
				if(phoneCityCode)con.phoneCityCode = phoneCityCode;
				if(username)con.username = '%'+username+'%';
				if(firstname)con.firstname = '%'+firstname+'%';
				if(lastname)con.lastname = '%'+lastname+'%';
				if(groupName)con.groupName = '%'+groupName+'%';
				if(birtdayStart && birtdayEnd){
					con.birtdayStart = birtdayStart;con.birtdayEnd = birtdayEnd;
				}else{
					if(birtdayStart || birtdayEnd){
						if(birtdayStart){con.birtdayStart = birtdayStart;con.birtdayEnd = 999999999999;}
						if(birtdayEnd){con.birtdayStart = 0;con.birtdayEnd = birtdayEnd;}
					}
				}
				if(email)con.email = '%'+email+'%';
				if(nationalCode)con.nationalCode = '%'+nationalCode+'%';
				if(city)con.city = city;
				if(postCode)con.postCode = '%'+postCode+'%';
				if(registerStart && registerEnd){
					con.registerStart = registerStart;con.registerEnd = registerEnd;
				}else{
					if(registerStart || registerEnd){
						if(registerStart){con.registerStart = registerStart;con.registerEnd = 999999999999;}
						if(registerEnd){con.registerStart = 0;con.registerEnd = registerEnd;}
					}
				}
				ajax.post('/users/select/mediumInfo',con,'users-select-container',function(data){
					var write = '';
					if(data.error){
						template.page.user.usersSelectContainer(templateDatas.systemErrorEmpty)
						return;
					}
					data.forEach( function(element, index) {
						let w = templateDatas.userSelectItem;
						w = w.replace(/\{\$userId\}/g,element.userId);
						w = w.replace(/\{\$userId\}/g,element.userId);
						w = w.replace(/\{\$username\}/g,element.userUsername);
						w = w.replace(/\{\$firstname\}/g,element.userInfoFirstName);
						w = w.replace(/\{\$lastname\}/g,element.userInfoLastName);
						w = w.replace(/\{\$birtday\}/g,new Date(element.userInfoBirtday).toDateString());
						w = w.replace(/\{\$groupName\}/g,element.userGroupName);
						w = w.replace(/\{\$registrationTime\}/g,new Date(element.userRegistrationDate).toDateString())
						write += w;
					});
					if(!write)write = templateDatas.systemErrorEmpty;
					else write = templateDatas.usersSelectTable.replace(/\{\$items\}/g,write);
					template.page.user.usersSelectContainer(write);
				})
			},
			userProfileContainer: function(data){
				 $(document.getElementById('users-profile-container')).hide().html(data).fadeIn(1000);
			},
			profileId : null,
			printUserProfile: function(id = false,mode = false){
				if(!id)return;
				this.profileId = id;
				this.category('usersCategoryProfile');
				let write = templateDatas.usersProfileTemp;
				template.page.user.usersContainer(write);
				let con = {userId: id};
				var editMode = mode;
				ajax.post('/users/select/fullInfo',con,'users-profile-container',function(data){
					data = data[0];
					let write;
					if(editMode)write = templateDatas.usersProfileContentEdit;
					else write = templateDatas.usersProfileContent;
					write = write.replace(/\{\$id\}/g,data.userId);
					write = write.replace(/\{\$username\}/g,data.userUsername);
					write = write.replace(/\{\$groupName\}/g,data.userGroupName);
					write = write.replace(/\{\$groupId\}/g,data.userGroupId);
					write = write.replace(/\{\$firstname\}/g,data.userInfoFirstName);
					write = write.replace(/\{\$lastname\}/g,data.userInfoLastName);
					write = write.replace(/\{\$registerDate\}/g,new Date(data.userRegistrationDate).toDateString());
					write = write.replace(/\{\$birtday\}/g,new Date(data.userInfoBirtday).toDateString());
					write = write.replace(/\{\$postCode\}/g,data.userPostCode);
					write = write.replace(/\{\$nationalCode\}/g,data.userInfoNationalCode);
					write = write.replace(/\{\$email\}/g,data.userInfoEmail);
					write = write.replace(/\{\$city\}/g,data.userAddrCity);
					write = write.replace(/\{\$area\}/g,data.userAddrArea);
					write = write.replace(/\{\$street\}/g,data.userAddrStreet);
					write = write.replace(/\{\$alley\}/g,data.userAddrAlley);
					write = write.replace(/\{\$plaque\}/g,data.userAddrPlaque);
					write = write.replace(/\{\$moreInfo\}/g,data.userAddrMoreInfo);
					let address = data.userAddrCity+' شهر';
					if(data.userAddrArea)address += '- '+data.userAddrArea+' اتوبان ';
					if(data.userAddrStreet)address += '- '+data.userAddrStreet+' خیابان ';
					if(data.userAddrAlley)address += '- '+data.userAddrAlley+' کوچه ';
					if(data.userAddrPlaque)address += '- '+data.userAddrPlaque+' پلاک ';
					if(data.userAddrMoreInfo)address += '- '+data.userAddrMoreInfo;
					write = write.replace(/\{\$address\}/g,address);
					var phone = '';
					data.userPhone.forEach(function(element,index){
						let t;
						let p;
						if(editMode)t = templateDatas.usersProfileContentPhoneEdit;
						else t = templateDatas.usersProfileContentPhone;
						p = element.userPhoneId;
						t = t.replace(/\{\$id\}/g,p);
						p = element.userPhonrCityCode;
						t = t.replace(/\{\$cityCode\}/g,p);
						p = element.userPhoneNumber;
						t = t.replace(/\{\$phoneNumber\}/g,p);
						p = element.userPhonrCityCode+element.userPhoneNumber+'+';
						phone += t.replace(/\{\$number\}/g,p);
					})
					write = write.replace(/\{\$phone\}/g,phone);
					var child = '';
					data.child.forEach(function(element,index){
						let t;
						if(editMode)t = templateDatas.usersProfileContentChildEdit;
						else t = templateDatas.usersProfileContentChild;
						let p = element.userChildFirstName + ' ' + element.userChildLastName;
						t = t.replace(/\{\$name\}/g,p);
						p = new Date(element.UserChildBirtday).toDateString();
						t = t.replace(/\{\$birtday\}/g,p);
						p = element.userChildGender ? 'دختر' : 'پسر';
						t = t.replace(/\{\$gender\}/g,p);
						p = element.userChildId;
						t = t.replace(/\{\$id\}/g,p);
						p = element.userChildFirstName;
						t = t.replace(/\{\$firstname\}/g,p);
						p = element.userChildLastName;
						t = t.replace(/\{\$lastname\}/g,p);
						p = element.userChildGender ? 'selected' : '';
						t = t.replace(/\{\$genderGirl\}/g,p);
						p = element.userChildGender ? '' : 'selected';
						t = t.replace(/\{\$genderBoy\}/g,p);
						child += t;
					})
					write = write.replace(/\{\$child\}/g,child);
					var educationBackground = '';
					data.educationBackground.forEach(function(element,index){
						let t;
						if(editMode)t = templateDatas.usersProfileContentEduBckEdit;
						else t = templateDatas.usersProfileContentEduBck;
						let p = element.userEducationBackgroundUniversity;
						t = t.replace(/\{\$uni\}/g,p);
						p = element.userEducationBackgroundAverage;
						t = t.replace(/\{\$avarage\}/g,p);
						p = new Date(element.userEducationBackgroundEndDate).toDateString();
						t = t.replace(/\{\$endTime\}/g,p);
						p = element.userEducationBackgroundEndDateId;
						t = t.replace(/\{\$id\}/g,p);
						educationBackground += t;
					})
					write = write.replace(/\{\$educationBackground\}/g,educationBackground);
					var resume = '';
					data.resume.forEach(function(element,index){
						let t;
						if(editMode)t = templateDatas.usersProfileContentResumeEdit;
						else t = templateDatas.usersProfileContentResume;
						let p = element.userResumePlaceName;
						t = t.replace(/\{\$name\}/g,p);
						p = new Date(element.userResumeStartTime).toDateString();
						t = t.replace(/\{\$startTime\}/g,p);
						p = new Date(element.userResumeEndTime).toDateString();
						t = t.replace(/\{\$endTime\}/g,p);
						p = element.userResumeDiscription;
						t = t.replace(/\{\$description\}/g,p);
						p = element.userResumeId;
						t = t.replace(/\{\$id\}/g,p);
						resume += t;
					})					
					write = write.replace(/\{\$resume\}/g,resume);
					template.page.user.userProfileContainer(write);
				});
			},
			api: {
				updateUsername: function(id){
					//user-profile-edit-form-username
					let username = document.getElementById('user-profile-edit-form-username').value;
					if(!username)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.username = username;
					ajax.post('/users/update/user',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-username').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-password').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);					});
				},
				updatePassword: function(id){
					//user-profile-edit-form-password
					let password = document.getElementById('user-profile-edit-form-password').value;
					if(!password)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.password = password;
					ajax.post('/users/update/user',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-password').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-password').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);					});
				},
				updateGroupId: function(id){
					//user-profile-edit-form-userGroupId
					let userGroupId = document.getElementById('user-profile-edit-form-userGroupId').value;
					if(!userGroupId)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.userGroupId = userGroupId;
					ajax.post('/users/update/user',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-userGroupId').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-userGroupId').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updateFirstname: function(id){
					// user-profile-edit-form-firstname
					let firstname = document.getElementById('user-profile-edit-form-firstname').value;
					if(!firstname)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.firstname = firstname;
					ajax.post('/users/update/info',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-firstname').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-password').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updateLastname: function(id){
					//user-profile-edit-form-lastname
					let lastname = document.getElementById('user-profile-edit-form-lastname').value;
					if(!lastname)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.lastname = lastname;
					ajax.post('/users/update/info',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-lastname').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-lastname').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updateBirtday: function(id){
					//user-profile-edit-form-birtday
					let birtday = document.getElementById('user-profile-edit-form-birtday').value;
					if(!birtday)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.birtday = birtday;
					ajax.post('/users/update/info',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-birtday').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-birtday').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updatePostCode: function(id){
					//user-profile-edit-form-postCode
					let postCode = document.getElementById('user-profile-edit-form-postCode').value;
					if(!postCode)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.postCode = postCode;
					ajax.post('/users/update/info',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-postCode').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-postCode').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updateNationalCode: function(id){
					//user-profile-edit-form-nationalCode
					let nationalCode = document.getElementById('user-profile-edit-form-nationalCode').value;
					if(!nationalCode)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.nationalCode = nationalCode;
					ajax.post('/users/update/info',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-nationalCode').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-nationalCode').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updateEmail: function(id){
					//user-profile-edit-form-email
					let email = document.getElementById('user-profile-edit-form-email').value;
					if(!email)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.email = email;
					ajax.post('/users/update/info',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-email').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-email').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updateCity: function(id){
					//user-profile-edit-form-city
					let city = document.getElementById('user-profile-edit-form-city').value;
					if(!city)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.city = city;
					ajax.post('/users/update/info',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-city').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-city').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updateArea: function(id){
					//user-profile-edit-form-area
					let area = document.getElementById('user-profile-edit-form-area').value;
					if(!area)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.area = area;
					ajax.post('/users/update/info',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-area').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-area').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updateStreet: function(id){
					//user-profile-edit-form-street
					let street = document.getElementById('user-profile-edit-form-street').value;
					if(!street)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.street = street;
					ajax.post('/users/update/info',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-area').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-area').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updateAlley: function(id){
					//user-profile-edit-form-alley
					let alley = document.getElementById('user-profile-edit-form-alley').value;
					if(!alley)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.alley = alley;
					ajax.post('/users/update/info',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-alley').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-alley').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updatePlaque: function(id){
					//user-profile-edit-form-plaque
					let plaque = document.getElementById('user-profile-edit-form-plaque').value;
					if(!plaque)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.plaque = plaque;
					ajax.post('/users/update/info',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-plaque').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-plaque').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updateMoreInfo: function(id){
					//user-profile-edit-form-moreInfo
					let addrMoreInfo = document.getElementById('user-profile-edit-form-moreInfo').value;
					if(!addrMoreInfo)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.addrMoreInfo = addrMoreInfo;
					ajax.post('/users/update/info',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-moreInfo').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-moreInfo').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updatePhone: function(id){
					//user-profile-edit-form-phoneNumber-{$id}
					//user-profile-edit-form-cityCode-{$id}
					let number = document.getElementById('user-profile-edit-form-phoneNumber-'+id).value;
					let cityCode = document.getElementById('user-profile-edit-form-cityCode-'+id).value;
					if(!number)return;
					if(!cityCode)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.number = number;
					input.set.cityCode = cityCode;
					ajax.post('/users/update/phone',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-phoneNumber-'+id).style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-cityCode-'+id).style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-phoneNumber-'+id).style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-cityCode-'+id).style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updateChild: function(id){
					//user-profile-edit-form-childFirstname-{$id}
					//user-profile-edit-form-childLastname-{$id}
					//user-profile-edit-form-childBirtday-{$id}
					//user-profile-edit-form-childGender-{$id}
					let firstname = document.getElementById('user-profile-edit-form-childFirstname-'+id).value;
					let lastname = document.getElementById('user-profile-edit-form-childLastname-'+id).value;
					let birtday = document.getElementById('user-profile-edit-form-childBirtday-'+id).value;
					let gender = document.getElementById('user-profile-edit-form-childGender-'+id).selectedIndex;
					gender = gender == 'girl' ? true : false;
					if(!firstname)return;
					if(!lastname)return;
					if(!birtday)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.firstname = firstname;
					input.set.lastname = lastname;
					input.set.birtday = birtday;
					input.set.gender = gender;
					ajax.post('/users/update/child',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-childFirstname-'+id).style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-childLastname-'+id).style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-childBirtday-'+id).style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-childGender-'+id).style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-childFirstname-'+id).style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-childLastname-'+id).style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-childBirtday-'+id).style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-childGender-'+id).style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updateBE: function(id){
					//user-profile-edit-form-BEUni-{$id}
					//user-profile-edit-form-BEAverage-{$id}
					//user-profile-edit-form-BEEndTime-{$id}
					let univercity = document.getElementById('user-profile-edit-form-BEUni-'+id).value;
					let average = document.getElementById('user-profile-edit-form-BEAverage-'+id).value;
					let endDate = document.getElementById('user-profile-edit-form-BEEndTime-'+id).value;
					if(!univercity)return;
					if(!average)return;
					if(!endDate)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.univercity = univercity;
					input.set.average = average;
					input.set.endDate = endDate;
					ajax.post('/users/update/educationBackground',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-BEUni-'+id).style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-BEAverage-'+id).style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-BEEndTime-'+id).style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-BEUni-'+id).style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-BEAverage-'+id).style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-BEEndTime-'+id).style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				updateResume: function(id){
					//user-profile-edit-form-ResumeName-{$id}
					//user-profile-edit-form-ResumeStartTime-{$id}
					//user-profile-edit-form-ResumeEndTime-{$id}
					//user-profile-edit-form-ResumeDescription-{$id}
					let placeName = document.getElementById('user-profile-edit-form-ResumeName-'+id).value;
					let startTime = document.getElementById('user-profile-edit-form-ResumeStartTime-'+id).value;
					let endTime = document.getElementById('user-profile-edit-form-ResumeEndTime-'+id).value;
					let description = document.getElementById('user-profile-edit-form-ResumeDescription-'+id).value;
					if(!placeName)return;
					if(!startTime)return;
					if(!endTime)return;
					if(!description)return;
					let input = {con:{},set:{}};
					input.con.id = id;
					input.set.placeName = placeName;
					input.set.startTime = startTime;
					input.set.endTime = endTime;
					input.set.description = description;
					ajax.post('/users/update/educationBackground',input,'page-loading',function(data){
						if(data.error){
							document.getElementById('user-profile-edit-form-ResumeName-'+id).style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-ResumeStartTime-'+id).style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-ResumeEndTime-'+id).style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-ResumeDescription-'+id).style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-ResumeName-'+id).style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-ResumeStartTime-'+id).style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-ResumeEndTime-'+id).style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-ResumeDescription-'+id).style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				insertPhone: function(){
					//user-profile-edit-form-phoneNumber
					//user-profile-edit-form-cityCode
					let number = document.getElementById('user-profile-edit-form-phoneNumber').value;
					let cityCode = document.getElementById('user-profile-edit-form-cityCode').value;
					if(!number)return;
					if(!cityCode)return;
					let input = {};
					input.userId = template.page.user.profileId;
					input.phoneNumber = number;
					input.cityCode = cityCode;
					ajax.post('/users/insert/phone',input,'page-loading',function(data){
						console.log(data);
						if(data.error){
							document.getElementById('user-profile-edit-form-phoneNumber').style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-cityCode').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-phoneNumber').style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-cityCode').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				insertChild: function(){
					//user-profile-edit-form-childFirstname
					//user-profile-edit-form-childLastname
					//user-profile-edit-form-childBirtday
					//user-profile-edit-form-childGender
					let firstname = document.getElementById('user-profile-edit-form-childFirstname').value;
					let lastname = document.getElementById('user-profile-edit-form-childLastname').value;
					let birtday = document.getElementById('user-profile-edit-form-childBirtday').value;
					let gender = document.getElementById('user-profile-edit-form-childGender').selectedIndex;
					gender = gender == 'girl' ? true : false;
					if(!firstname)return;
					if(!lastname)return;
					if(!birtday)return;
					let input = {};
					input.userId = id;
					input.firstname = firstname;
					input.lastname = lastname;
					input.birtday = birtday;
					input.gender = gender;
					ajax.post('/users/update/inputChild',input,'page-loading',function(data){
						console.log(data);
						if(data.error){
							document.getElementById('user-profile-edit-form-childFirstname').style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-childLastname').style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-childBirtday').style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-childGender').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-childFirstname').style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-childLastname').style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-childBirtday').style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-childGender').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				insertBE: function(){
					//user-profile-edit-form-BEUni
					//user-profile-edit-form-BEAverage
					//user-profile-edit-form-BEEndTime
					let univercity = document.getElementById('user-profile-edit-form-BEUni').value;
					let average = document.getElementById('user-profile-edit-form-BEAverage').value;
					let endDate = document.getElementById('user-profile-edit-form-BEEndTime').value;
					if(!univercity)return;
					if(!average)return;
					if(!endDate)return;
					let input = {};
					input.userId = template.page.user.profileId;
					input.univercity = univercity;
					input.avarage = average;
					input.endDate = endDate;
					ajax.post('/users/insert/educationBackground',input,'page-loading',function(data){
						console.log(data);
						if(data.error){
							document.getElementById('user-profile-edit-form-BEUni').style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-BEAverage').style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-BEEndTime').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-BEUni').style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-BEAverage').style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-BEEndTime').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
					
				},
				insertResume: function(){
					//user-profile-edit-form-ResumeName
					//user-profile-edit-form-ResumeStartTime
					//user-profile-edit-form-ResumeEndTime
					//user-profile-edit-form-ResumeDescription
					let placeName = document.getElementById('user-profile-edit-form-ResumeName').value;
					let startTime = document.getElementById('user-profile-edit-form-ResumeStartTime').value;
					let endTime = document.getElementById('user-profile-edit-form-ResumeEndTime').value;
					let description = document.getElementById('user-profile-edit-form-ResumeDescription').value;
					if(!placeName)return;
					if(!startTime)return;
					if(!endTime)return;
					if(!description)return;
					let input = {};
					input.userId = template.page.user.profileId;
					input.placeName = placeName;
					input.startTime = startTime;
					input.endTime = endTime;
					input.description = description;
					ajax.post('/users/insert/educationBackground',input,'page-loading',function(data){
						console.log(data);
						if(data.error){
							document.getElementById('user-profile-edit-form-ResumeName').style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-ResumeStartTime').style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-ResumeEndTime').style.borderColor = 'red';
							document.getElementById('user-profile-edit-form-ResumeDescription').style.borderColor = 'red';
							return;
						}
						document.getElementById('user-profile-edit-form-ResumeName').style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-ResumeStartTime').style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-ResumeEndTime').style.borderColor = 'green';
						document.getElementById('user-profile-edit-form-ResumeDescription').style.borderColor = 'green';
						setTimeout(function(){template.page.user.printUserProfile(template.page.user.profileId,true)},1000);
					});
				},
				deletePhone: function(id){
					if(!id)return;
					let input = {};
					input.id = id;
					ajax.post('/users/delete/phone',input,'page-loading',function(data){
						if(data.error){
							alert('error in delete!')
							return;
						}
						template.page.user.printUserProfile(template.page.user.profileId,true);
					});
				},
				deleteChild: function(id){
					if(!id)return;
					let input = {};
					input.id = id;
					ajax.post('/users/delete/child',input,'page-loading',function(data){
						if(data.error){
							alert('error in delete!')
							return;
						}
						template.page.user.printUserProfile(template.page.user.profileId,true);
					});
				},
				deleteBE: function(id){
					if(!id)return;
					let input = {};
					input.id = id;
					ajax.post('/users/delete/educationBackground',input,'page-loading',function(data){
						if(data.error){
							alert('error in delete!')
							return;
						}
						template.page.user.printUserProfile(template.page.user.profileId,true);
					});
				},
				deleteResume: function(id){
					if(!id)return;
					let input = {};
					input.id = id;
					ajax.post('/users/delete/resume',input,'page-loading',function(data){
						if(data.error){
							alert('error in delete!')
							return;
						}
						template.page.user.printUserProfile(template.page.user.profileId,true);
					});
				},
				createNewUser: function(){
					
				},
			},
			printUsersCreate: function(){
				this.category('usersCategoryCreate');
				let write = templateDatas.usersCreateTemp;
				template.page.user.usersContainer(write);
			},
		},
		backup:{
			open : function(){
				template.page.home.category('homePanelCategoryBackup');
				template.page.home.panelContainer(templateDatas.systemErrorEmpty);
			},
		},
		stock:{
			open : function(){
				template.page.home.category('homePanelCategoryStock');
				template.page.home.panelContainer(templateDatas.systemErrorEmpty);
			},
		},
		request:{
			open : function(){
				template.page.home.category('homePanelCategoryRequests');
				template.page.home.panelContainer(templateDatas.systemErrorEmpty);
			},
		},
		report:{
			open : function(){
				template.page.home.category('homePanelCategoryReports');
				template.page.home.panelContainer(templateDatas.systemErrorEmpty);
			},
		},
	}
};

template.page.home.open();
