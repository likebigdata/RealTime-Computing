from flask_cors import CORS
import redis
from flask import Flask, jsonify, render_template

app = Flask(__name__)
CORS(app)
r = redis.StrictRedis(host='127.0.0.1', port=6379, db=0, decode_responses=True, charset='UTF-8', encoding='UTF-8')

# 统计每秒处理数据量
# 定义全局变量每次记录上一秒的数据
global number_tip
number_tip = 0.0
@app.route('/speed', methods=['GET', 'POST'])
def time():
    global number_tip
    print(number_tip)
    number = int(r.get("order_num"))
    speed = str(number - number_tip)
    number_tip = number
    print(speed)
    return speed


# 统计总销售额(total)
@app.route('/total_price', methods=['GET', 'POST'])
def sum_total():
    total_price = r.get("total_price")
    print(total_price)
    return total_price


# 订单数量(order)
@app.route('/order_num', methods=['GET', 'POST'])
def order_num():
    order_num = r.get("order_num")
    print(order_num)
    # print(type(order_num))
    return order_num


# 下单客户数(custom)
@app.route('/custom_num', methods=['GET', 'POST'])
def custom_num():
    keys = r.keys()
    custom_key = []
    for i in keys:
        if i[:6] == "custom":
            custom_key.append(i)
    # 集合去重
    custom_key = set(custom_key)
    custom_num = len(custom_key)
    return str(custom_num)


# 全国各地下单的图书的累计数量（按省份）(city)
@app.route('/city_num', methods=['GET', 'POST'])
def city_num():
    city_key = []
    keys = r.keys()
    for i in keys:
        if i[:4] == "city":
            city_key.append(i)
    temp = {"北京": 0, "天津": 0, "上海": 0, "重庆": 0,
            "内蒙古": 0, "新疆": 0, "西藏": 0, "宁夏": 0, "广西": 0,
            "香港": 0, "澳门": 0,
            "黑龙江": 0, "吉林": 0, "辽宁": 0, "河北": 0, "山西": 0, "青海": 0, "山东": 0, "河南": 0, "江苏": 0, "安徽": 0, "浙江": 0, "福建": 0,
            "江西": 0, "湖南": 0, "湖北": 0, "广东": 0, "台湾": 0, "海南": 0, "甘肃": 0, "陕西": 0, "四川": 0, "贵州": 0, "云南": 0}

    for i in city_key:
        for j in temp.keys():
            if j in i[4:]:
                # temp[j] = r.get(i)
                temp[j] += 1

    data = []
    for i in temp.keys():
        tmp = {"name": str(i), "value": int(temp[i])}
        data.append(tmp)

    # print(len(data))
    # print(data)
    return jsonify(data)


# 每个出版社(press)的总销量
@app.route('/press_num', methods=['GET', 'POST'])
def press_num():
    keys = r.keys()
    press_key = []
    # 该储存方法占用Redis太大内存，造成前端展示页面太卡顿
    # for i in keys:
    #     # print(i[:8])
    #     if i[:9] == "press_num":
    #         press_key.append(i)
    # data = []
    # for i in press_key:
    #     tmp = {"press": str(i[9:]), "num": int(r.get(i))}
    #     data.append(tmp)
    # data = sorted(data, key=lambda x: x['num'], reverse=True)
    # # print(len(data))
    # print("press_num")
    # print(data[:10])

    for i in keys:
        if i == "press_num":
            press_key = r.zrange("press_num", 0, 9, desc=True, withscores=True)
    data = []
    for a, b in press_key:
        tmp = {"press": a, "num": int(b)}
        data.append(tmp)
    # print("press_num")
    # print(data)
    return jsonify(data)
    # return jsonify(data[:10])


# 每本图书(book)的销售数量
@app.route('/book_num', methods=['GET', 'POST'])
def book_num():
    keys = r.keys()
    book_key = []
    # 该储存方法占用Redis太大内存，造成前端展示页面太卡顿
    # for i in keys:
    #     # print(i[:8])
    #     if i[:8] == "book_num":
    #         book_key.append(i)
    # data = []
    # for i in book_key:
    #     tmp = {"book": str(i[8:]), "num": int(r.get(i))}
    #     data.append(tmp)
    # data = sorted(data, key=lambda x: x['num'], reverse=True)

    for i in keys:
        if i == "book_num":
            book_key = r.zrange("book_num", 0, 9, desc=True, withscores=True)
    data = []
    for a, b in book_key:
        tmp = {"book": a, "num": int(b)}
        data.append(tmp)
    # print("book_num")
    # print(data)
    return jsonify(data)
    # return jsonify(data[:10])


# 支付类型数量
@app.route('/payment_num', methods=['GET', 'POST'])
def payment_num():
    keys = r.keys()
    payment_key = []
    for i in keys:
        # print(i[:8])
        if i[:12] == "payment_type":
            payment_key.append(i)
    data = []
    for i in payment_key:
        tmp = {"name": str(i[12:]), "value": int(r.get(i))}
        data.append(tmp)
    data = sorted(data, key=lambda x: x['value'], reverse=True)
    # print(len(data))
    # print(data)
    return jsonify(data)


# 图书类型销量(type)
@app.route('/type_num', methods=['GET', 'POST'])
def type_num():
    keys = r.keys()
    type_key = []
    for i in keys:

        if i[:8] == "type_num":
            type_key.append(i)
    data = []
    for i in type_key:
        tmp = {"type": str(i[8:]), "num": int(r.get(i))}
        data.append(tmp)
    data = sorted(data, key=lambda x: x['num'], reverse=True)

    return jsonify(data[:10])


# 全国各地下单的图书的累计数量（按省份）(source)
@app.route('/source_num', methods=['GET', 'POST'])
def source_num():
    source_key = []
    keys = r.keys()
    for i in keys:
        if i[:6] == "source":
            source_key.append(i)
    temp = {"北京": 0, "天津": 0, "上海": 0, "重庆": 0,
            "内蒙古": 0, "新疆": 0, "西藏": 0, "宁夏": 0, "广西": 0,
            "香港": 0, "澳门": 0,
            "黑龙江": 0, "吉林": 0, "辽宁": 0, "河北": 0, "山西": 0, "青海": 0, "山东": 0, "河南": 0, "江苏": 0, "安徽": 0, "浙江": 0, "福建": 0,
            "江西": 0, "湖南": 0, "湖北": 0, "广东": 0, "台湾": 0, "海南": 0, "甘肃": 0, "陕西": 0, "四川": 0, "贵州": 0, "云南": 0}

    for i in source_key:
        for j in temp.keys():
            if j in i[4:]:
                temp[j] = r.get(i)

    data = []
    for i in temp.keys():
        tmp = {"name": str(i), "value": int(temp[i])}
        data.append(tmp)

    # print("source")
    # print(data)
    return jsonify(data)


@app.route('/', methods=['GET', 'POST'])
def self():
    return render_template("Dashboard.html")

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
