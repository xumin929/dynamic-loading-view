#!/bin/bash
set -x

package_name=
dependent_lib_packet_name="null"
dependent_deploy_packet_name="null"
install_flag=0
package_dir=`pwd`
name=`pwd |awk -F '/' '{print $NF}'`
placeholder="null"
placeholder1="null"
placeholder2="null"

#while getopts "n dn l" OPT
while true; do
    case "$1" in
       -n | --package_name ) package_name=$2; shift 2 ;;
       -dn | --dependent_lib_packet_name ) dependent_lib_packet_name=$2; shift 2 ;;
	   -dd | --dependent_deploy_packet_name ) dependent_deploy_packet_name=$2; shift 2 ;;
       -l | --install_flag ) install_lab=$2; shift 2 ;;
       -o | --placeholder ) placeholder=$2; shift 2 ;;
       -t | --placeholder1 ) placeholder1=$2; shift 2 ;;
       -h | --placeholder1 ) placeholder1=$2; shift 2 ;;
       *) echo "usage: $0 -n b2b-news-operating-view -dn b2b-lib-view -l 1 -o placeholder -t placeholder1 -h placeholder2 ";
          break;;
    esac
done


get_packet_script_dir(){

	if [ ! -d "$package_dir" ];then
		echo "package_dir:$package_dir is null"
		exit 1
	fi
	cd $package_dir

	if [ $dependent_lib_packet_name == "null" ];then

		tools_dir=`find . -name "*-package-deploy*"|grep -v '@'|awk -F '/' '{print $2}'`
	else
		echo "dependent_lib_packet_name is $dependent_lib_packet_name"
	fi

	
	if [ -z "$tools_dir" ];then
		echo "$tools_dir doesn't exist"
		exit 1
	fi
	cd -

}
get_packet_script_dir
if [ -z "$package_name"  ];then
	package_name=`echo $name|awk -F '.' '{print $2}'`
fi

#cd ecc-b2b-devops.b2b-package-deploy.master

cd $tools_dir
cp scripts/view/*view.sh $package_dir/
cd -
chmod +x *view*.sh
sh build_view.sh $package_name $package_dir $install_flag $tools_dir $dependent_deploy_packet_name $placeholder $placeholder1 $placeholder2




