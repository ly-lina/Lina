const variants = (baseSku, retail, project, options = {}) => {
  const buttons = options.buttons || [1]
  const colors = options.colors || ['Trắng']
  const bases = options.bases || ['Đế vuông']
  return buttons.flatMap((button) => colors.flatMap((color) => bases.map((base) => {
    const colorCode = { 'Trắng': 'WH', 'Đen': 'BK', 'Vàng Champagne': 'CH', 'Xám': 'GY' }[color]
    const baseCode = base === 'Đế vuông' ? 'SQ' : 'RC'
    const buttonCode = options.buttoned ? `${button}B-` : ''
    const surcharge = (button - 1) * 65000 + (color === 'Vàng Champagne' ? 120000 : color === 'Đen' || color === 'Xám' ? 50000 : 0) + (base === 'Đế chữ nhật' ? 20000 : 0)
    return {
      id: `${baseSku}-${buttonCode}${colorCode}-${baseCode}`,
      sku: `${baseSku}-${buttonCode}${colorCode}-${baseCode}`,
      buttons: options.buttoned ? button : null,
      color,
      base,
      retail_price: retail + surcharge,
      project_price: project + surcharge,
    }
  })))
}

export const products = [
  {
    id: 'lg-touch', name: 'Công tắc cảm ứng mặt kính Luxury', series: 'Luxury Glass', type: 'smart', category: 'Công tắc',
    connection: 'Zigbee 3.0', description: 'Mặt kính cường lực tinh giản, điều khiển chạm nhạy và kết nối ổn định với hệ sinh thái nhà thông minh.',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1000&q=85',
    variants: variants('LG-T', 1290000, 980000, { buttons: [1, 2, 3], colors: ['Trắng', 'Đen', 'Vàng Champagne'], bases: ['Đế vuông', 'Đế chữ nhật'], buttoned: true }),
    specifications: { 'Nguồn điện': 'AC 100–240V, 50/60Hz', 'Công suất tải': 'Tối đa 400W / kênh', 'Kết nối': 'Zigbee 3.0', 'Chất liệu': 'Kính cường lực, hợp kim nhôm', 'Kích thước': '86 × 86 × 35 mm', 'Bảo hành': '24 tháng' },
    related_products: ['hub-zigbee', 'frame-glass'],
  },
  {
    id: 'wifi-switch', name: 'Công tắc Wi-Fi cảm ứng Modern', series: 'Modern Aluminum', type: 'smart', category: 'Công tắc',
    connection: 'Wi-Fi', description: 'Điều khiển từ xa qua ứng dụng, hẹn giờ linh hoạt và tương thích trợ lý giọng nói phổ biến.',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1000&q=85',
    variants: variants('MW-SW', 890000, 690000, { buttons: [1, 2, 3], colors: ['Trắng', 'Đen', 'Xám'], bases: ['Đế vuông', 'Đế chữ nhật'], buttoned: true }),
    specifications: { 'Nguồn điện': 'AC 100–240V', 'Công suất tải': 'Tối đa 300W / kênh', 'Kết nối': 'Wi-Fi 2.4GHz', 'Chất liệu': 'Kính cường lực', 'Ứng dụng': 'Smart Life / Tuya', 'Bảo hành': '24 tháng' },
    related_products: ['hub-zigbee', 'frame-aluminum'],
  },
  {
    id: 'zigbee-socket', name: 'Ổ cắm thông minh Zigbee 16A', series: 'Luxury Glass', type: 'smart', category: 'Ổ cắm',
    connection: 'Zigbee 3.0', description: 'Giám sát và bật tắt thiết bị từ xa; tự động hóa an toàn cho thiết bị điện công suất cao.',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1000&q=85',
    variants: variants('LG-ZS', 1150000, 890000, { colors: ['Trắng', 'Đen', 'Vàng Champagne'], bases: ['Đế vuông', 'Đế chữ nhật'] }),
    specifications: { 'Dòng định mức': '16A', 'Điện áp': '220–240V AC', 'Kết nối': 'Zigbee 3.0', 'Đo điện năng': 'Có', 'Chuẩn ổ cắm': 'Đa năng 3 chấu', 'Bảo hành': '24 tháng' },
    related_products: ['hub-zigbee', 'frame-glass'],
  },
  {
    id: 'hub-zigbee', name: 'Bộ điều khiển trung tâm Home Hub', series: 'Modern Aluminum', type: 'smart', category: 'Cảm biến & Bộ điều khiển',
    connection: 'Zigbee 3.0', description: 'Trung tâm kết nối thiết bị Zigbee, tạo ngữ cảnh và điều khiển hệ thống trong một ứng dụng.',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1000&q=85',
    variants: variants('HB-ZB', 1890000, 1450000, { colors: ['Trắng', 'Xám'] }),
    specifications: { 'Kết nối': 'Zigbee 3.0, Ethernet, Wi-Fi', 'Thiết bị tối đa': '128 thiết bị', 'Nguồn cấp': 'USB-C 5V', 'Tương thích': 'iOS / Android', 'Bảo hành': '24 tháng' },
    related_products: ['lg-touch', 'zigbee-socket'],
  },
  {
    id: 'presence-sensor', name: 'Cảm biến hiện diện đa vùng', series: 'Modern Aluminum', type: 'smart', category: 'Cảm biến & Bộ điều khiển',
    connection: 'KNX', description: 'Phát hiện hiện diện chính xác, tối ưu chiếu sáng và điều hòa theo trạng thái sử dụng thực tế.',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1000&q=85',
    variants: variants('KNX-PS', 2450000, 1980000, { colors: ['Trắng', 'Đen'] }),
    specifications: { 'Giao thức': 'KNX TP1', 'Vùng phát hiện': '360°, bán kính 6m', 'Lắp đặt': 'Âm trần', 'Nguồn cấp': 'Bus KNX', 'Ứng dụng': 'Chiếu sáng / HVAC', 'Bảo hành': '36 tháng' },
    related_products: ['hub-zigbee', 'knx-switch'],
  },
  {
    id: 'knx-switch', name: 'Bộ điều khiển KNX 4 kênh', series: 'Modern Aluminum', type: 'smart', category: 'Công tắc',
    connection: 'KNX', description: 'Điều khiển ngữ cảnh KNX cho công trình cao cấp, thiết kế đồng bộ cùng mặt che kim loại.',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1000&q=85',
    variants: variants('KNX-4C', 3250000, 2680000, { buttons: [2, 4], colors: ['Trắng', 'Đen', 'Xám'], bases: ['Đế vuông', 'Đế chữ nhật'], buttoned: true }),
    specifications: { 'Giao thức': 'KNX TP1', 'Kênh điều khiển': '4 kênh / 8 ngữ cảnh', 'Nguồn cấp': 'Bus KNX', 'Chất liệu': 'Nhôm anodized', 'Lắp đặt': 'Âm tường', 'Bảo hành': '36 tháng' },
    related_products: ['presence-sensor', 'frame-aluminum'],
  },
  {
    id: 'mechanical-switch', name: 'Công tắc cơ Classic 3 hạt', series: 'Classic White', type: 'conventional', category: 'Công tắc',
    connection: 'Cơ truyền thống', description: 'Tiếp điểm bền bỉ, thao tác chắc tay và linh hoạt phối hợp với mặt che đồng bộ.',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1000&q=85',
    variants: variants('CW-SW', 185000, 139000, { buttons: [1, 2, 3], colors: ['Trắng', 'Đen'], bases: ['Đế vuông', 'Đế chữ nhật'], buttoned: true }),
    specifications: { 'Điện áp định mức': '250V AC', 'Dòng định mức': '16A', 'Tiếp điểm': 'Đồng hợp kim', 'Chất liệu': 'Nhựa chống cháy PC', 'Lắp đặt': 'Âm tường', 'Bảo hành': '24 tháng' },
    related_products: ['frame-glass', 'frame-aluminum'],
  },
  {
    id: 'double-socket', name: 'Ổ cắm đôi 3 chấu Classic', series: 'Classic White', type: 'conventional', category: 'Ổ cắm',
    connection: 'Cơ truyền thống', description: 'Ổ cắm đôi đa năng với màn che an toàn, phù hợp căn hộ và dự án lưu trú.',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1000&q=85',
    variants: variants('CW-SK', 210000, 158000, { colors: ['Trắng', 'Đen'], bases: ['Đế vuông', 'Đế chữ nhật'] }),
    specifications: { 'Điện áp định mức': '250V AC', 'Dòng định mức': '16A', 'Số ổ': '2 ổ đa năng 3 chấu', 'Màn che an toàn': 'Có', 'Chất liệu': 'Nhựa PC chống cháy', 'Bảo hành': '24 tháng' },
    related_products: ['frame-glass', 'frame-aluminum'],
  },
  {
    id: 'data-socket', name: 'Ổ cắm mạng RJ45 & TV đồng bộ', series: 'Classic White', type: 'conventional', category: 'Ổ cắm',
    connection: 'Cơ truyền thống', description: 'Kết nối mạng và truyền hình gọn gàng, mặt hoàn thiện tinh tế đồng bộ nội thất.',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1000&q=85',
    variants: variants('CW-DT', 165000, 125000, { colors: ['Trắng', 'Đen', 'Xám'], bases: ['Đế vuông', 'Đế chữ nhật'] }),
    specifications: { 'Cổng mạng': 'RJ45 Cat6', 'Cổng TV': 'Coaxial 75Ω', 'Chất liệu': 'Nhựa PC chống cháy', 'Lắp đặt': 'Âm tường', 'Bảo hành': '24 tháng' },
    related_products: ['frame-glass', 'mechanical-switch'],
  },
  {
    id: 'frame-glass', name: 'Mặt che Luxury viền kính', series: 'Luxury Glass', type: 'conventional', category: 'Mặt che & Đế âm',
    connection: 'Cơ truyền thống', description: 'Mặt che kính cường lực hoàn thiện cao cấp, tạo điểm nhấn đồng bộ cho không gian.',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1000&q=85',
    variants: variants('LG-FR', 320000, 245000, { buttons: [1, 2, 3, 4], colors: ['Trắng', 'Đen', 'Vàng Champagne', 'Xám'], buttoned: true }),
    specifications: { 'Vật liệu': 'Kính cường lực 4mm', 'Kích thước': '86 × 86 mm', 'Tương thích': 'Series Luxury Glass', 'Màu sắc': '4 màu hoàn thiện', 'Bảo hành': '24 tháng' },
    related_products: ['mechanical-switch', 'double-socket'],
  },
  {
    id: 'frame-aluminum', name: 'Mặt che viền nhôm Modern', series: 'Modern Aluminum', type: 'conventional', category: 'Mặt che & Đế âm',
    connection: 'Cơ truyền thống', description: 'Viền nhôm anodized mỏng nhẹ, phối hợp linh hoạt với cơ cấu công tắc và ổ cắm.',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1000&q=85',
    variants: variants('MW-FR', 285000, 215000, { buttons: [1, 2, 3, 4], colors: ['Trắng', 'Đen', 'Xám'], buttoned: true }),
    specifications: { 'Vật liệu': 'Hợp kim nhôm anodized', 'Kích thước': '86 × 86 mm', 'Tương thích': 'Series Modern Aluminum', 'Lắp đặt': 'Đế vuông / chữ nhật', 'Bảo hành': '24 tháng' },
    related_products: ['wifi-switch', 'double-socket'],
  },
]

export const solutions = [
  {
    id: 'hotel', title: 'Khách sạn thông minh', short: 'Khách sạn', en: 'Smart Hotel', number: '01',
    description: 'Vận hành tinh gọn, nâng tầm trải nghiệm lưu trú với điều khiển ngữ cảnh và quản lý năng lượng theo phòng.',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=85',
    zones: [
      { name: 'Sảnh lễ tân', description: 'Điều khiển ánh sáng và biển hiệu theo khung giờ.', devices: [{ productId: 'knx-switch', quantity: '2 bộ' }, { productId: 'presence-sensor', quantity: '4 bộ' }] },
      { name: 'Phòng ngủ khách sạn', description: 'Điều khiển ngữ cảnh, tiện nghi cạnh giường và cảm biến tiết kiệm điện.', devices: [{ productId: 'lg-touch', quantity: '2 bộ' }, { productId: 'zigbee-socket', quantity: '2 bộ' }, { productId: 'presence-sensor', quantity: '1 bộ' }] },
      { name: 'Hành lang', description: 'Tự động bật sáng khi có người, tối ưu thời gian vận hành.', devices: [{ productId: 'presence-sensor', quantity: '1 bộ / khu vực' }, { productId: 'knx-switch', quantity: '1 bộ' }] },
    ],
  },
  {
    id: 'villa', title: 'Biệt thự cao cấp', short: 'Biệt thự', en: 'Smart Villa', number: '02',
    description: 'Một chạm cho mọi không gian sống, tích hợp ánh sáng, rèm, an ninh và điều hòa trong một hệ thống.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    zones: [
      { name: 'Phòng khách', description: 'Kịch bản tiếp khách, thư giãn và xem phim.', devices: [{ productId: 'knx-switch', quantity: '2 bộ' }, { productId: 'lg-touch', quantity: '2 bộ' }, { productId: 'hub-zigbee', quantity: '1 bộ' }] },
      { name: 'Phòng ngủ chính', description: 'Điều khiển đầu giường, chiếu sáng và thiết bị tiện nghi.', devices: [{ productId: 'lg-touch', quantity: '2 bộ' }, { productId: 'zigbee-socket', quantity: '2 bộ' }] },
      { name: 'Sân vườn & cổng', description: 'Tự động hóa chiếu sáng ngoại thất và kiểm soát theo lịch.', devices: [{ productId: 'wifi-switch', quantity: '2 bộ' }, { productId: 'hub-zigbee', quantity: '1 bộ' }] },
    ],
  },
  {
    id: 'building', title: 'Tòa nhà thương mại', short: 'Tòa nhà', en: 'Building Management System', number: '03',
    description: 'BMS linh hoạt cho chiếu sáng và HVAC, giúp quản lý tập trung và tiết kiệm năng lượng toàn tòa nhà.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    zones: [
      { name: 'Sảnh & khu vực chung', description: 'Điều khiển tập trung theo lịch hoạt động tòa nhà.', devices: [{ productId: 'knx-switch', quantity: '4 bộ' }, { productId: 'presence-sensor', quantity: '6 bộ' }] },
      { name: 'Văn phòng làm việc', description: 'Chiếu sáng theo hiện diện và tận dụng ánh sáng tự nhiên.', devices: [{ productId: 'presence-sensor', quantity: '1 bộ / phòng' }, { productId: 'knx-switch', quantity: '2 bộ / phòng' }] },
      { name: 'Phòng họp', description: 'Kịch bản thuyết trình và họp trực tuyến chỉ với một chạm.', devices: [{ productId: 'knx-switch', quantity: '2 bộ' }, { productId: 'presence-sensor', quantity: '1 bộ' }] },
    ],
  },
  {
    id: 'apartment', title: 'Căn hộ thông minh', short: 'Căn hộ', en: 'Smart Apartment', number: '04',
    description: 'Bắt đầu từ công tắc thông minh, mở rộng linh hoạt theo nhu cầu với trải nghiệm điều khiển đơn giản.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    zones: [
      { name: 'Phòng khách', description: 'Kịch bản tiếp khách, xem phim và điều khiển ánh sáng.', devices: [{ productId: 'wifi-switch', quantity: '2 bộ' }, { productId: 'hub-zigbee', quantity: '1 bộ' }] },
      { name: 'Phòng ngủ', description: 'Điều khiển đèn và ổ cắm tiện nghi ngay đầu giường.', devices: [{ productId: 'lg-touch', quantity: '1 bộ' }, { productId: 'zigbee-socket', quantity: '2 bộ' }] },
      { name: 'Bếp & hành lang', description: 'Thiết bị bền bỉ, cảm biến hỗ trợ tự động chiếu sáng.', devices: [{ productId: 'mechanical-switch', quantity: '2 bộ' }, { productId: 'presence-sensor', quantity: '1 bộ' }] },
    ],
  },
]

export const projects = [
  { name: 'The Lumière Riverside', location: 'TP. Hồ Chí Minh', scale: 'Hơn 900 căn hộ', type: 'Căn hộ cao cấp', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Anantara Quy Nhon Villas', location: 'Bình Định', scale: '26 biệt thự nghỉ dưỡng', type: 'Resort & khách sạn', image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85' },
  { name: 'The Nexus Office', location: 'TP. Hồ Chí Minh', scale: 'Hơn 80.000 m²', type: 'Tòa nhà thương mại', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Villa An Phú', location: 'Thủ Đức, TP. Hồ Chí Minh', scale: 'Biệt thự 680 m²', type: 'Biệt thự thông minh', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85' },
]

export const categories = ['Công tắc', 'Ổ cắm', 'Cảm biến & Bộ điều khiển', 'Mặt che & Đế âm']
export const series = ['Luxury Glass', 'Modern Aluminum', 'Classic White']
export const connections = ['Zigbee 3.0', 'Wi-Fi', 'KNX']
