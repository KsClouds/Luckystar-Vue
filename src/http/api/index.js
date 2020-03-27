/**
 * api接口的统一出口
 */
import article from '@/http/api/article'
import login from '@/http/api/login'
import star from '@/http/api/star'
import qrcode from '@/http/api/qrcode'
import animation from '@/http/api/animation'
import studyMaterial from '@/http/api/studyMaterial'
import novel from '@/http/api/novel'

// 导出接口
export default {
  article,
  login,
  star,
  qrcode,
  animation,
  studyMaterial,
  novel
}
