package com.baidu.ueditor;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import com.jd.ecc.b2b.session.ControllerContext;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.baidu.ueditor.define.FileType;
import com.jd.b2b.shop.common.util.json.JsonUtils;
import com.jd.ecc.b2b.base.center.service.client.ImgService;

/**
 * 重写富文本编辑框的图片上传
 * @author gongjuan
 *
 */
public class UploadImg4Ueditor {
	
	private static final Logger log = Logger.getLogger(UploadImg4Ueditor.class);

	private HttpServletRequest request = null;

	public UploadImg4Ueditor(HttpServletRequest request) {
		super();
		this.request = request;
	}
	
	public String uploadImg(){
		Map<String, Object> upImgJson = new HashMap<String, Object>();
		
		ServletFileUpload upload = new ServletFileUpload(new DiskFileItemFactory());
        upload.setHeaderEncoding( "UTF-8" );
        FileItemStream fileStream = null;
		try {
			FileItemIterator iterator = upload.getItemIterator(request);
			while (iterator.hasNext()) {
				fileStream = iterator.next();
				if (!fileStream.isFormField()){
					break;
				}
				fileStream = null;
			}
			if (fileStream == null) {
				upImgJson.put("state", "未找到上传数据");
				return JsonUtils.toJSON(upImgJson);
			}

			String originFileName = fileStream.getName();
			String suffix = FileType.getSuffixByFilename(originFileName);
			
			String imgSuffix = suffix.substring(1, suffix.length());
			// 验证： 支持JPG,JPEG,PNG,GIF,BMP格式。
			if(!imgSuffix.equalsIgnoreCase("JPG")
					&& !imgSuffix.equalsIgnoreCase("JPEG")
					&& !imgSuffix.equalsIgnoreCase("PNG")
					&& !imgSuffix.equalsIgnoreCase("GIF")
					&& !imgSuffix.equalsIgnoreCase("BMP")){
				upImgJson.put("state", "不允许的图片类型");
				log.info("富文本上传图片格式不符合规范： " + imgSuffix);
				return JsonUtils.toJSON(upImgJson);
			}

			InputStream is = fileStream.openStream();
			byte[] fileByteArray = inputStreamTOByte(is);
			long fileLen = fileByteArray.length;
			if (fileLen > 3 * 1024 * 1024) {
				upImgJson.put("state", "图片大小超出限制");
				log.info("富文本上传图片大小超出限制： " + fileLen);
				return JsonUtils.toJSON(upImgJson);
			}
			
			// 保存图片至jfs
			ServletContext context = request.getSession().getServletContext();
			ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(context);

			ImgService imgService = (ImgService)ctx.getBean("imgService");

			String pictureUrl = imgService.uploadImg(ControllerContext.getPlatformId(),fileByteArray);
			is.close();
			if(StringUtils.isEmpty(pictureUrl)){
				upImgJson.put("state", "上传图片失败");
				return JsonUtils.toJSON(upImgJson);
			}
			upImgJson.put("state", "SUCCESS");
			upImgJson.put("title", originFileName);
			upImgJson.put("original", originFileName);
			upImgJson.put("type", suffix);
			upImgJson.put("url", pictureUrl);
			upImgJson.put("size", fileLen);
			log.info("富文本上传图片成功");
		}catch (FileUploadException e) {
			upImgJson.put("state", "上传图片失败");
			log.error("富文本上传图片抛异常： ", e);
		} catch (IOException e) {
			upImgJson.put("state", "上传图片失败");
			log.error("富文本上传图片抛异常： ", e);
		} catch (Exception e) {
			upImgJson.put("state", "上传图片失败");
			log.error("富文本上传图片抛异常： ", e);
		}
		return JsonUtils.toJSON(upImgJson);
	}
	
	/**
	 * 将InputStream转换成byte数组  
	 * @param in
	 * @return
	 * @throws IOException
	 */
    public static byte[] inputStreamTOByte(InputStream in) throws IOException {  
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();  
        byte[] data = new byte[4096];  
        int count = -1;  
        while ((count = in.read(data, 0, 4096)) != -1)  
            outStream.write(data, 0, count);  
        data = null;  
        return outStream.toByteArray();  
    }  
}
