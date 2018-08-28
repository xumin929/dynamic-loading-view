<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="com.baidu.ueditor.ActionEnter,com.baidu.ueditor.UploadImg4Ueditor"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%
    request.setCharacterEncoding( "utf-8" );
	response.setHeader("Content-Type" , "text/html");
	
	String rootPath = application.getRealPath( "/" );
	
	// 上传图片自定义处理
	String actionType = request.getParameter("action");
	if(actionType.equals("uploadimage")){
		out.write(new UploadImg4Ueditor(request).uploadImg());
	}else{
		out.write( new ActionEnter( request, rootPath ).exec() );
	}
%>
 