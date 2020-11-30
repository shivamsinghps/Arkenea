module.exports = (o, salt) =>
{
    o = JSON.stringify(o)
    // for(var i = 0, l = o.length; i < l; i++)
    //     if(o[i] == '{')
    //         o[i] = '}';
    //     else if(o[i] == '}')
    //         o[i] = '{';
    return o;
}