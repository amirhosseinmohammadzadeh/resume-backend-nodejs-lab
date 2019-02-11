var templateDatas = {
	'loading':`
		<button class="btn btn-primary" disabled>
		  <span class="spinner-border spinner-border-sm"></span>
		  در حال بارگزاری..
		</button>
	`,
	'homeLoginContent': `
		<div class="login-container fixed-center">
			<div class="col">
				<form action="javascript:void(0)" method="post">
					<div class="row d-inline-flex">
						<div class="p-2"><div class="spinner-grow text-info"></div></div>
						<div class="p-1"><h2>لابراتوار دندانسازی</h2></div>
					</div>
					<div class="row p-2" id="home-login-form-alert-box"></div>
					<div class="row p-2"><input class="form-control" id="home-login-form-username" type="text" placeholder="نام کاربری"></div>
					<div class="row p-2"><input class="form-control" id="home-login-form-password" type="password" placeholder="رمز عبور"></div>
					<div class="row p-2"><input class="btn btn-primary btn-block" type="submit" onclick="javascript:template.page.home.api.login();return false;" value="ورود"></div>
				</form>
			</div>
			<footer>
				all right reserved by www.ventiuk.com
			</footer>
		</div>
	`,
	'homeLoginErrorUserPass':`
		<div class="alert alert-danger w-100">نام کاربری یا رمز عبور اشتباه</div>
	`,
	'homeLoginSuccess':`
		<div class="alert alert-success w-100">ورود با موفقیت</div>
	`,
	'homePanelContent':`
		<div class="category">
			{$category}
		</div>
		<div class="panel-container" id="home-panel-container"></div>
		<footer>
			all right reserved by www.ventiuk.com
		</footer>
	`,
	'homePanelCategory':`
		<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
			<a style="color:#fff;text-weight: bold;" class="navbar-brand">لابراتوار دندانسازی</a>
			<ul class="navbar-nav">
				{$item}
			</ul>
		</nav>
	`,
	'homePanelCategoryUsers':`
		<li id="homePanelCategoryUsers" class="nav-item"><a class="nav-link" href="javascript:void(0)" onclick="javascript:template.page.user.open();return false;">کاربران</a></li>
	`,
	'homePanelCategoryStock':`
		<li id="homePanelCategoryStock" class="nav-item"><a class="nav-link" href="javascript:void(0)" onclick="javascript:template.page.stock.open();return false;">انبار</a></li>
	`,
	'homePanelCategoryReports':`
		<li id="homePanelCategoryReports" class="nav-item"><a class="nav-link" href="javascript:void(0)" onclick="javascript:template.page.report.open();return false;">گزارشات</a></li>
	`,
	'homePanelCategoryRequests':`
		<li id="homePanelCategoryRequests" class="nav-item"><a class="nav-link" href="javascript:void(0)" onclick="javascript:template.page.request.open();return false;">درخواست ها</a></li>
	`,
	'homePanelCategoryBackup':`
		<li id="homePanelCategoryBackup" class="nav-item"><a class="nav-link" href="javascript:void(0)" onclick="javascript:template.page.backup.open();return false;">نسخه پشتیبان</a></li>
	`,
	'homePanelCategoryLogout':`
		<li class="nav-item"><a class="nav-link text-danger" href="javascript:void(0)" onclick="javascript:template.page.home.api.logout();return false;">خروج</a></li>
	`,
	'systemErrorEmpty':`<br><div class="alert alert-warning w-100">هیچ محتوایی یافت نشد</div>`,
	'users':`
		<div class="cat">
			{$category}
		</div>
		<hr>
		<div id="users-container"></div>
	`,
	'usersSelectTemp':`
		<div class="row">
			<div class="col-lg-2">
				<h3>فیلتر</h3>
				<form class="form-group" action="javascript:void(0)" method="post">
					<hr><div><input class="btn btn-primary btn-block" type="submit" onclick="javascript:template.page.user.printUsersList();return false;" value="اعمال فیلتر"></div><hr>
					<div><lable>گروه کاربری<input id="user-select-form-filter-group-name" class="m-1 w-100 form-control" type="text"></lable></div>
					<div><lable>شماره موبایل<input id="user-select-form-filter-phone-number" class="m-1 w-100 form-control" type="text" maxlength="10" placeholder="9XXXXXXXXX"></lable></div>
					<div><lable>کد کشور<input id="user-select-form-filter-phone-city-code" class="m-1 w-100 form-control" type="text" maxlength="3" placeholder="98"></lable></div>
					<div><lable>نام کاربری<input id="user-select-form-filter-username" class="m-1 w-100 form-control" type="text"></lable></div>
					<div><lable>نام<input id="user-select-form-filter-firstname" class="m-1 w-100 form-control" type="text"></lable></div>
					<div><lable>نام خانوادگی<input id="user-select-form-filter-lastname" class="m-1 w-100 form-control" type="text"></lable></div>
					<div><lable>تاریخ تولد از<input id="user-select-form-filter-birtday-start" class="m-1 w-100 form-control" type="date"></lable></div>
					<div><lable>تاریخ تولد تا<input id="user-select-form-filter-birtday-end" class="m-1 w-100 form-control" type="date"></lable></div>
					<div><lable>پست الکترونیکی<input id="user-select-form-filter-email" class="m-1 w-100 form-control" type="email" placeholder="sample@mail.com"></lable></div>
					<div><lable>کد ملی<input id="user-select-form-filter-national-code" class="m-1 w-100 form-control" type="text" maxlength="10"></lable></div>
					<div><lable>شهر سکونت<input id="user-select-form-filter-city" class="m-1 w-100 form-control" type="text"></lable></div>
					<div><lable>کد پستی<input id="user-select-form-filter-post-code" class="m-1 w-100 form-control" type="text" maxlength="10"></lable></div>
					<div><lable>تاریخ ثبت نام از<input id="user-select-form-filter-register-start" class="m-1 w-100 form-control" type="date"></lable></div>
					<div><lable>تاریخ ثبت نام تا<input id="user-select-form-filter-register-end" class="m-1 w-100 form-control" type="date"></lable></div>
				</form>
			</div>
			<div id="users-select-container" class="col-lg-10 table-responsive-lg"></div>
		</div>
	`,
	'usersSelectTable':`
		<h3>لیست کاربران</h3>
		<hr>
		<table width="100%" class="table-striped">
			<thead>
				<tr>
					<td class="d-none d-sm-table-cell">شماره</td>
					<td>نام کاربری</td>
					<td>نام</td>
					<td>نام خانوادگی</td>
					<td class="d-none d-md-table-cell">تاریخ تولد</td>
					<td class="d-none d-lg-table-cell">گروه کاربری</td>
					<td class="d-none d-xl-table-cell">تاریخ عضویت</td>
				</tr>
			</thead>
			<tbody>
			{$items}
			</tbody>
		</table>
	`,
	'userSelectItem':`
		<tr onclick="javascript:template.page.user.printUserProfile({$userId});return false;">
			<td class="d-none d-sm-table-cell">{$userId}</td>
			<td>{$username}</td>
			<td>{$firstname}</td>
			<td>{$lastname}</td>
			<td class="d-none d-md-table-cell">{$birtday}</td>
			<td class="d-none d-lg-table-cell">{$groupName}</td>
			<td class="d-none d-xl-table-cell">{$registrationTime}</td>
		</tr>
	`,
	'usersCategory':`
		<nav class="navbar navbar-expand-sm bg-light navbar-light">
			<ul class="navbar-nav">
				{$item}
			</ul>
		</nav>
	`,
	'usersCategoryCreate':`
		<li id="usersCategoryCreate" class="nav-item"><a class="nav-link" href="javascript:void(0)" onclick="javascript:template.page.user.printUsersCreate();return false;">ایحاد کاربر جدید</a></li>
	`,
	'usersCategoryList':`
		<li id="usersCategoryList" class="nav-item active"><a class="nav-link" href="javascript:void(0)" onclick="javascript:template.page.user.printUsersSelect();return false;">لیست کاربران</a></li>
	`,
	'usersCategoryProfile':`
		<li id="usersCategoryProfile" class="nav-item"><a class="nav-link" href="javascript:void(0)" onclick="javascript:template.page.user.printUserProfile({$myid});return false;">صفحه کاربر</a></li>
	`,
	'usersProfileTemp':`
		<div id="users-profile-container"></div>
	`,
	'usersProfileContent':`
		<a href="javascript:void(0)" onclick="javascript:template.page.user.printUserProfile({$id},true);return false;">ویرایش</a>
		<div class="col">
			<div class="row"> آی دی : {$id} </div>
			<div class="row"> نام کاربری : {$username} </div>
			<div class="row"> گروه کاربری : {$groupName} </div>
			<div class="row"> نام : {$firstname} </div>
			<div class="row"> نام خانوادگی : {$lastname} </div>
			<div class="row"> تاریخ ثبت نام : {$registerDate} </div>
			<div class="row"> تاریخ تولد : {$birtday} </div>
			<div class="row"> کد پستی : {$postCode} </div>
			<div class="row"> کد ملی : {$nationalCode} </div>
			<div class="row"> پست الکترونیکی : {$email} </div>
			<div class="row"> نشانی : {$address} </div>
			<div class="row"> شماره تماس : <ul>{$phone}</ul> </div>
			<div class="row"> فرزندان : <ul>{$child}</ul> </div>
			<div class="row"> پیشینه تحصیلی : <ul>{$educationBackground}</ul> </div>
			<div class="row"> رزومه : <ul>{$resume}</ul> </div>
		</div>
	`,
	'usersProfileContentPhone':`
		<li>{$number}</li>
	`,
	'usersProfileContentChild':`
		<li>
			<div class="col">
				<div class="row">نام: {$name}</div>
				<div class="row">تولد: {$birtday}</div>
				<div class="row">جنسیت: {$gender}</div>
			</div>
		</li>
	`,
	'usersProfileContentEduBck':`
		<li>
			<div class="col">
				<div class="row">دانشگاه: {$uni}</div>
				<div class="row">معدل: {$avarage}</div>
				<div class="row">اتمام: {$endTime}</div>
			</div>
		</li>
	`,
	'usersProfileContentResume':`
		<li>
			<div class="col">
				<div class="row">محل: {$name}</div>
				<div class="row">از: {$startTime}</div>
				<div class="row">تا :{$endTime}</div>
				<div class="row">توضیحات: {$description}</div>
			</div>
		</li>
	`,
	'usersProfileContentEdit':`
		<div class="col">
				<div class="row m-3"> آی دی : {$id} </div>
				<div class="row m-3">
					<form method="post" action="javascript:void(0)">
						 نام کاربری :
						 <div class="form-inline">
							 <input type="text" value="{$username}" class="m-1 form-control" id="user-profile-edit-form-username"> 
							 <input type="submit" onclick="javascript:template.page.user.api.updateUsername({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">
						 </div>
					</form>
				</div>
				<div class="row m-3">
					<form method="post" action="javascript:void(0)">
						 رمز عبور :
						 <div class="form-inline">
							 <input type="password" class="m-1 form-control" id="user-profile-edit-form-password"> 
							 <input type="submit" onclick="javascript:template.page.user.api.updatePassword({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">
						 </div>
					</form>
				</div>
				<div class="row m-3">
					<form method="post" action="javascript:void(0)">
						 گروه کاربری : 
						<div class="form-inline">
							 <input type="number" value="{$groupId}" class="m-1 form-control" id="user-profile-edit-form-userGroupId">
							 <input type="submit" onclick="javascript:template.page.user.api.updateGroupId({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">
						</div>
					</form>
				</div>
				<div class="row m-3">
					<form method="post" action="javascript:void(0)">
						نام :
						<div class="form-inline"> 
							<input type="text" value="{$firstname}" class="m-1 form-control" id="user-profile-edit-form-firstname">
							<input type="submit" onclick="javascript:template.page.user.api.updateFirstname({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">
						</div>
					</form>
				</div>
				<div class="row m-3">
					<form method="post" action="javascript:void(0)">
						نام خانوادگی : 
						<div class="form-inline"> 
							<input type="text" value="{$lastname}" class="m-1 form-control" id="user-profile-edit-form-lastname">
							<input type="submit" onclick="javascript:template.page.user.api.updateLastname({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">
						</div>
					</form>
				</div>
				<div class="row m-3"> تاریخ ثبت نام : {$registerDate} </div>
				<div class="row m-3">
					<form method="post" action="javascript:void(0)">
						تاریخ تولد : {$birtday} > 
						<div class="form-inline"> 
							<input type="date" class="m-1 form-control" id="user-profile-edit-form-birtday">
							<input type="submit" onclick="javascript:template.page.user.api.updateBirtday({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">
						</div>
					</form>
				</div>
				<div class="row m-3">
					<form method="post" action="javascript:void(0)">
						کد پستی :
						<div class="form-inline"> 
							<input type="text" value="{$postCode}" maxlength="10" class="m-1 form-control" id="user-profile-edit-form-postCode">
							<input type="submit" onclick="javascript:template.page.user.api.updatePostCode({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">
						</div>
					</form>
				</div>
				<div class="row m-3">
					<form method="post" action="javascript:void(0)">
						کد ملی :
						<div class="form-inline"> 
							<input type="text" value="{$nationalCode}" maxlength="10" class="m-1 form-control" id="user-profile-edit-form-nationalCode">
							<input type="submit" onclick="javascript:template.page.user.api.updateNationalCode({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">						
						</div>
					</form>
				</div>
				<div class="row m-3">
					<form method="post" action="javascript:void(0)">
						پست الکترونیکی :
						<div class="form-inline">
							<input type="email" value="{$email}" class="m-1 form-control" id="user-profile-edit-form-email">
							<input type="submit" onclick="javascript:template.page.user.api.updateEmail({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">						
						</div>
					</form>
				</div>
				<hr>
				<div class="row m-3"> نشانی : {$address}</div>
				<div class="row m-3">
					<form method="post" action="javascript:void(0)">
						شهر :
						<div class="form-inline">
							<input type="text" value="{$city}" class="m-1 form-control" id="user-profile-edit-form-city">
							<input type="submit" onclick="javascript:template.page.user.api.updateCity({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">						
						</div>
					</form>
				</div>
				<div class="row m-3">
					<form method="post" action="javascript:void(0)">
						اتوبان : 
						<div class="form-inline">
							<input type="text" value="{$area}" class="m-1 form-control" id="user-profile-edit-form-area">
							<input type="submit" onclick="javascript:template.page.user.api.updateArea({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">
						</div>
					</form>
				</div>
				<div class="row m-3">
					<form method="post" action="javascript:void(0)">
						خیابان :
						<div class="form-inline">
							<input type="text" value="{$street}" class="m-1 form-control" id="user-profile-edit-form-street">
							<input type="submit" onclick="javascript:template.page.user.api.updateStreet({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">			
						</div>
					</form>
				</div>
				<div class="row m-3">
					<form method="post" action="javascript:void(0)">
						کوچه :
						<div class="form-inline">
							<input type="text" value="{$alley}" class="m-1 form-control" id="user-profile-edit-form-alley">
							<input type="submit" onclick="javascript:template.page.user.api.updateAlley({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">			
						</div>
					</form>
				</div>
				<div class="row m-3">
					<form method="post" action="javascript:void(0)">
						پلاک :
						<div class="form-inline">
							<input type="number" value="{$plaque}" class="m-1 form-control" id="user-profile-edit-form-plaque">
							<input type="submit" onclick="javascript:template.page.user.api.updatePlaque({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">						
						</div>
					</form>
				</div>
				<div class="row m-3">
					<form method="post" action="javascript:void(0)">
						اطلاعات بیشتر آدرس :
						<div class="form-inline">
							<input type="text" value="{$moreInfo}" class="m-1 form-control" id="user-profile-edit-form-moreInfo">
							<input type="submit" onclick="javascript:template.page.user.api.updateMoreInfo({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">						
						</div>
					</form>
				</div>
				<hr>
				<div class="row m-3"> شماره تماس : 
					<ul>
						<li>
							<form method="post" action="javascript:void(0)">
								<div class="form-inline">
									<input type="text" class="m-1 form-control" id="user-profile-edit-form-phoneNumber" maxlength="10">
									<input type="text" style="width:50px;" class="m-1 form-control" id="user-profile-edit-form-cityCode" maxlength="3">
									<input type="submit" onclick="javascript:template.page.user.api.insertPhone();return false" class="m-1 form-control btn btn-primary" value="اضافه کردن">						
								</div>
							</form>
						</li>
						{$phone}
					</ul>
				</div>
				<hr>
				<div class="row m-3"> فرزندان : 
					<ul>
						<li>
							<form method="post" action="javascript:void(0)">
								<div class="form-inline">
									<input type="text" placeholder="نام" class="m-1 form-control" id="user-profile-edit-form-childFirstname">
									<input type="text" placeholder="نام خانوادگی" class="m-1 form-control" id="user-profile-edit-form-childLastname">
									<input type="date" class="m-1 form-control" id="user-profile-edit-form-childBirtday">
									<select class="m-1 form-control" id="user-profile-edit-form-childGender">
										<option>جنسیت</option>
										<option value="girl">دختر</option>
										<option value="boy">پسر</option>
									</select>
									<input type="submit" onclick="javascript:template.page.user.api.insertChild();return false" class="m-1 form-control btn btn-primary" value="اضافه کردن">						
								</div>
							</form>
						</li>
						{$child}
					</ul> 
				</div>
				<hr>
				<div class="row m-3"> پیشینه تحصیلی : 
					<ul>
						<li>
							<form method="post" action="javascript:void(0)">
								<div class="form-inline">
									<input type="text" placeholder="نام دانشگاه" class="m-1 form-control" id="user-profile-edit-form-BEUni">
									<input type="number" placeholder="معدل" style="width:100px" value="{$avarage}" class="m-1 form-control" id="user-profile-edit-form-BEAverage">
									<input type="date" class="m-1 form-control" id="user-profile-edit-form-BEEndTime">
									<input type="submit" onclick="javascript:template.page.user.api.insertBE();return false" class="m-1 form-control btn btn-primary" value="اضافه کردن">						
								</div>
							</form>
						</li>
						{$educationBackground}
					</ul>
				</div>
				<hr>
				<div class="row m-3"> رزومه : 
					<ul>
						<li>
							<form method="post" action="javascript:void(0)">
								<div class="form-inline">
									<input type="text" placeholder="نام محل" class="m-1 form-control" id="user-profile-edit-form-ResumeName">
									از: <input type="date" class="m-1 form-control" id="user-profile-edit-form-ResumeStartTime">
									تا: <input type="date" class="m-1 form-control" id="user-profile-edit-form-ResumeEndTime">
									<textarea class="m-1 form-control" id="user-profile-edit-form-ResumeDescription" placeholder="توضیحات"></textarea>
									<input type="submit" onclick="javascript:template.page.user.api.insertResume();return false" class="m-1 form-control btn btn-primary" value="اضافه کردن">						
								</div>
							</form>
						</li>
						{$resume}
					</ul>
				</div>
			</form>
		</div>
	`,
	'usersProfileContentPhoneEdit':`
		<li>
			<form method="post" action="javascript:void(0)">
				<div class="form-inline">
					<input type="text" value="{$phoneNumber}" class="m-1 form-control" id="user-profile-edit-form-phoneNumber-{$id}" maxlength="10">
					<input type="text" value="{$cityCode}" style="width:50px;" class="m-1 form-control" id="user-profile-edit-form-cityCode-{$id}" maxlength="3">
					<input type="submit" onclick="javascript:template.page.user.api.updatePhone({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">						
					<input type="submit" onclick="javascript:template.page.user.api.deletePhone({$id});return false" class="m-1 form-control btn btn-danger" value="حذف">						
				</div>
			</form>
		</li>
	`,
	'usersProfileContentChildEdit':`
		<li>
			<form method="post" action="javascript:void(0)">
				<div class="form-inline">
					<input type="text" value="{$firstname}" class="m-1 form-control" id="user-profile-edit-form-childFirstname-{$id}">
					<input type="text" value="{$lastname}" class="m-1 form-control" id="user-profile-edit-form-childLastname-{$id}">
					{$birtday} > <input type="date" class="m-1 form-control" id="user-profile-edit-form-childBirtday-{$id}">
					<select class="m-1 form-control" id="user-profile-edit-form-childGender-{$id}">
						<option value="girl" {$genderGirl}>دختر</option>
						<option value="boy" {$genderBoy}>پسر</option>
					</select>
					<input type="submit" onclick="javascript:template.page.user.api.updateChild({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">						
					<input type="submit" onclick="javascript:template.page.user.api.deleteChild({$id});return false" class="m-1 form-control btn btn-danger" value="حذف">						
				</div>
			</form>
		</li>
	`,
	'usersProfileContentEduBckEdit':`
		<li>
			<form method="post" action="javascript:void(0)">
				<div class="form-inline">
					<input type="text" value="{$uni}" class="m-1 form-control" id="user-profile-edit-form-BEUni-{$id}">
					<input type="number" style="width:100px" value="{$avarage}" class="m-1 form-control" id="user-profile-edit-form-BEAverage-{$id}">
					{$endTime} > <input type="date" class="m-1 form-control" id="user-profile-edit-form-BEEndTime-{$id}">
					<input type="submit" onclick="javascript:template.page.user.api.updateBE({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">						
					<input type="submit" onclick="javascript:template.page.user.api.deleteBE({$id});return false" class="m-1 form-control btn btn-danger" value="حذف">						
				</div>
			</form>
		</li>
	`,
	'usersProfileContentResumeEdit':`
		<hr>
		<li>
			<form method="post" action="javascript:void(0)">
				<div class="form-inline">
					<input type="text" value="{$name}" class="m-1 form-control" id="user-profile-edit-form-ResumeName-{$id}">
					از: {$startTime} > <input type="date" class="m-1 form-control" id="user-profile-edit-form-ResumeStartTime-{$id}">
					تا :{$endTime} > <input type="date" class="m-1 form-control" id="user-profile-edit-form-ResumeEndTime-{$id}">
					<textarea class="m-1 form-control" id="user-profile-edit-form-ResumeDescription-{$id}">{$description}</textarea>
					<input type="submit" onclick="javascript:template.page.user.api.updateResume({$id});return false" class="m-1 form-control btn btn-primary" value="اعمال">						
					<input type="submit" onclick="javascript:template.page.user.api.deleteResume({$id});return false" class="m-1 form-control btn btn-danger" value="حذف">						
				</div>
			</form>
		</li>
	`,
	'usersCreateTemp':`
		<div class="col">
			<form method="post" action="javascript:void(0)">
				<div class="row m-3">
					 نام کاربری :
					 <div class="form-inline">
						 <input type="text" class="m-1 form-control" id="user-profile-form-username"> 
					 </div>
				</div>
				<div class="row m-3">
					 رمز عبور :
					 <div class="form-inline">
						 <input type="password" class="m-1 form-control" id="user-profile-form-password"> 
					 </div>
				</div>
				<div class="row m-3">
					 گروه کاربری : 
					<div class="form-inline">
						 <input type="number" class="m-1 form-control" id="user-profile-form-userGroupId">
					</div>
				</div>
				<div class="row m-3">
						نام :
						<div class="form-inline"> 
							<input type="text" class="m-1 form-control" id="user-profile-form-firstname">
						</div>
				</div>
				<div class="row m-3">
						نام خانوادگی : 
						<div class="form-inline"> 
							<input type="text" class="m-1 form-control" id="user-profile-form-lastname">
						</div>
				</div>
				<div class="row m-3">
						تاریخ تولد : 
						<div class="form-inline"> 
							<input type="date" class="m-1 form-control" id="user-profile-form-birtday">
						</div>
				</div>
				<div class="row m-3">
						کد پستی :
						<div class="form-inline"> 
							<input type="text" maxlength="10" class="m-1 form-control" id="user-profile-form-postCode">
						</div>
				</div>
				<div class="row m-3">
						کد ملی :
						<div class="form-inline"> 
							<input type="text" maxlength="10" class="m-1 form-control" id="user-profile-form-nationalCode">
						</div>
				</div>
				<div class="row m-3">
						پست الکترونیکی :
						<div class="form-inline">
							<input type="email" class="m-1 form-control" id="user-profile-form-email">
						</div>
				</div>
				<hr>
				<div class="row m-3">
						شهر :
						<div class="form-inline">
							<input type="text" class="m-1 form-control" id="user-profile-form-city">
						</div>
				</div>
				<div class="row m-3">
						اتوبان : 
						<div class="form-inline">
							<input type="text" class="m-1 form-control" id="user-profile-form-area">
						</div>
				</div>
				<div class="row m-3">
						خیابان :
						<div class="form-inline">
							<input type="text" class="m-1 form-control" id="user-profile-form-street">
						</div>
				</div>
				<div class="row m-3">
						کوچه :
						<div class="form-inline">
							<input type="text" class="m-1 form-control" id="user-profile-form-alley">
						</div>
				</div>
				<div class="row m-3">
						پلاک :
						<div class="form-inline">
							<input type="number" class="m-1 form-control" id="user-profile-form-plaque">
						</div>
				</div>
				<div class="row m-3">
						اطلاعات بیشتر آدرس :
						<div class="form-inline">
							<input type="text" class="m-1 form-control" id="user-profile-form-moreInfo">
						</div>
				</div>
				<input type="submit" onclick="javascript:template.page.user.api.createNewUser();return false" class="m-1 form-control btn btn-primary" value="اضافه کردن">						
			</form>
		</div>
	`,
}